var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import User from '../../../models/user/User.js';
const userRouter = Router();
// Get one User by username or get all users
userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.username) {
        const username = req.query.username;
        try {
            const user = yield User.find({ username: username });
            res.json(user);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    else {
        try {
            const users = yield User.find().sort({ username: 1 });
            res.json(users);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}));
// Create one User
userRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User({
        username: req.body.userName,
        email: req.body.userEmail,
    });
    try {
        const newUser = yield user.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Update one User - username / email / chats
userRouter.patch('/:id', getUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.username !== res.user.username) {
        res.user.username = req.body.username;
    }
    if (req.body.email !== res.user.email) {
        res.user.email = req.body.email;
    }
    if (req.body.chats !== res.user.chats) {
        res.user.chats.push(req.body.chats);
    }
    try {
        const updatedUser = yield res.user.save();
        res.json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Delete one User
userRouter.delete('/:id', getUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.user.remove();
        res.json({ message: res.user.username + " deleted" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        try {
            user = yield User.findById(req.params.id);
            if (user === null) {
                return res.status(404).json({ message: "Cannot find user" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
        res.user = user;
        next();
    });
}
export default userRouter;
//# sourceMappingURL=users.js.map