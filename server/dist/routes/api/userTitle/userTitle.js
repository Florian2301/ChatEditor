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
import Title from '../../../models/title/Title.js';
const titleRouter = Router();
// Get all Titles
titleRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.userId) {
        // get all Titles from logged in user
        try {
            const title = yield Title.find({ userId: req.query.userId });
            res.json(title);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    else {
        // get all titles and sort by user and chatnumber
        try {
            const title = yield Title.find().sort({ author: 1, chatnumber: 1 });
            res.json(title);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}));
// Get one Title
titleRouter.get('/:id', getTitle, (req, res) => {
    res.json(res.title);
});
// Creating one Title
titleRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = new Title({
        chatId: req.body.chatId,
        userId: req.body.userId,
        user: req.body.user,
        chatnumber: req.body.chatnumber,
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        language: req.body.language,
        tags: req.body.tags,
        description: req.body.description,
        admin: req.body.admin,
    });
    try {
        const newTitle = yield title.save();
        res.status(201).json(newTitle);
        // 201 means successfully created a new object
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    } // 400 means client-side-issue (e.g. wrong user input)
}));
// Updating one Title
titleRouter.patch('/:id', getTitle, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.chatnumber !== res.title.chatnumber) {
        res.title.chatnumber = req.body.chatnumber;
    }
    if (req.body.title !== res.title.title) {
        res.title.title = req.body.title;
    }
    if (req.body.author !== res.title.author) {
        res.title.author = req.body.author;
    }
    if (req.body.date !== res.title.date) {
        res.title.date = req.body.date;
    }
    if (req.body.language !== res.title.language) {
        res.title.language = req.body.language;
    }
    if (req.body.tags !== res.title.tags) {
        res.title.tags = req.body.tags;
    }
    if (req.body.description !== res.title.description) {
        res.title.description = req.body.description;
    }
    if (req.body.admin !== res.title.admin) {
        res.title.admin = req.body.admin;
    }
    try {
        const updatedTitle = yield res.title.save();
        res.json(updatedTitle);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Deleting one Title
titleRouter.delete('/:id', getTitle, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.title.remove();
        res.json({ message: 'Deleted title' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
function getTitle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let title;
        try {
            title = yield Title.findById(req.params.id);
            if (title === null) {
                return res.status(404).json({ message: 'Cannot find title' });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
        res.title = title;
        next();
    });
}
export default titleRouter;
//# sourceMappingURL=userTitle.js.map