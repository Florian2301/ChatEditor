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
import Chat from '../../../models/chat/Chat.js';
const chatRouter = Router();
// Get all chats from user
chatRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield Chat.find({ userId: req.query.userId }).sort({
            chatnumber: 1,
        });
        res.json(chat);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get one chat by id
chatRouter.get('/:id', getChat, (req, res) => {
    res.json(res.chat);
});
// Creating one Chat
chatRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let chat = new Chat({
        userId: req.body.userId,
        user: req.body.user,
        title: req.body.title,
        chatnumber: req.body.chatnumber,
        author: req.body.author,
        date: req.body.date,
        language: req.body.language,
        description: req.body.description,
        admin: req.body.admin,
    });
    req.body.tags.map((tag) => {
        chat.tags.push(tag);
    });
    req.body.messages.map((message) => {
        chat.messages.push(message);
    });
    req.body.philosopher.map((phil) => {
        chat.philosopher.push(phil);
    });
    try {
        const newChat = yield chat.save();
        res.status(201).json(newChat);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Updating Chatdetails
chatRouter.patch('/:id', getChat, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.chatnumber !== res.chat.chatnumber) {
        res.chat.chatnumber = req.body.chatnumber;
    }
    if (req.body.title !== res.chat.title) {
        res.chat.title = req.body.title;
    }
    if (req.body.author !== res.chat.author) {
        res.chat.author = req.body.author;
    }
    if (req.body.date !== res.chat.date) {
        res.chat.date = req.body.date;
    }
    if (req.body.language !== res.chat.language) {
        res.chat.language = req.body.language;
    }
    if (req.body.tags !== res.chat.tags) {
        res.chat.tags = req.body.tags;
    }
    if (req.body.description !== res.chat.description) {
        res.chat.description = req.body.description;
    }
    if (req.body.admin !== res.chat.admin) {
        res.chat.admin = req.body.admin;
    }
    if (req.body.comments !== res.chat.comments) {
        res.chat.comments = req.body.comments;
    }
    try {
        const updatedChat = yield res.chat.save();
        res.json(updatedChat);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Updating Chat messages
chatRouter.put('/:id', getChat, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.chat.messages.map((message) => {
        if (message.messagenumber === req.body.messagenumber) {
            message.text = req.body.text;
            return message.text;
        }
        return message.text;
    });
    try {
        const updatedChat = yield res.chat.save();
        res.json(updatedChat);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Deleting one Chat
chatRouter.delete('/:id', getChat, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.chat.remove();
        res.json({ message: 'Deleted message' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
function getChat(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let chat;
        try {
            chat = yield Chat.findById(req.params.id);
            if (chat === null) {
                return res.status(404).json({ message: 'Cannot find chat' });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
        res.chat = chat;
        next();
    });
}
export default chatRouter;
//# sourceMappingURL=userChats.js.map