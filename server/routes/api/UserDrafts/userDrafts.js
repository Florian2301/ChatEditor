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
import Draft from '../../../models/draft/Draft.js';
const draftRouter = Router();
// Getting all Drafts
draftRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drafts = yield Draft.find();
        res.json(drafts);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    } // 500 means server-side-issue
}));
// Getting one Draft
draftRouter.get('/:id', getDrafts, (req, res) => {
    res.json(res.draft);
});
// Creating one Draft
draftRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let draft = new Draft({
        admin: req.body.admin,
        userId: req.body.userId,
        user: req.body.user,
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        language: req.body.language,
        description: req.body.description,
        tags: [],
        messages: [],
        philosopher: [],
    });
    req.body.tags.map((tag) => {
        draft.tags.push(tag);
    });
    req.body.messages.map((message) => {
        draft.messages.push(message);
    });
    req.body.philosopher.map((phil) => {
        draft.philosopher.push(phil);
    });
    try {
        const newDraft = yield draft.save();
        res.status(201).json(newDraft);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// delete one message or update one message
draftRouter.put('/:id', getDrafts, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.messages) {
        // delete one message by replacing with new message array
        res.draft.messages = req.body.messages; // new array (req.body.messages) without deleted message
    }
    else {
        res.draft.messages.map((message) => {
            // update text of a single message
            if (message.messagenumber === req.body.messagenumber) {
                message.text = req.body.text;
                return message.text;
            }
            return message.text;
        });
    }
    try {
        const updatedDraft = yield res.draft.save();
        res.json(updatedDraft);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Update draft details and/or add new buttons/messages
draftRouter.patch('/:id', getDrafts, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.title !== res.draft.title) {
        res.draft.title = req.body.title;
    }
    if (req.body.author !== res.draft.author) {
        res.draft.author = req.body.author;
    }
    if (req.body.date !== res.draft.date) {
        res.draft.date = req.body.date;
    }
    if (req.body.published !== res.draft.published) {
        res.draft.published = req.body.published;
    }
    if (req.body.language !== res.draft.language) {
        res.draft.language = req.body.language;
    }
    if (req.body.tags !== res.draft.tags) {
        res.draft.tags = req.body.tags;
    }
    if (req.body.description !== res.draft.description) {
        res.draft.description = req.body.description;
    }
    if (req.body.messages !== res.draft.messages) {
        res.draft.messages = req.body.messages;
    }
    if (req.body.philosopher !== res.draft.philosopher) {
        res.draft.philosopher = req.body.philosopher;
    }
    if (req.body.admin !== res.draft.admin) {
        res.draft.admin = req.body.admin;
    }
    try {
        const updatedDraft = yield res.draft.save();
        res.json(updatedDraft);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Deleting one Draft
draftRouter.delete('/:id', getDrafts, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.draft.remove();
        res.json({ message: 'Deleted draft' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// function to get draft by id
function getDrafts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let draft;
        try {
            draft = yield Draft.findById(req.params.id);
            if (draft === null) {
                return res.status(404).json({ message: 'Cannot find draft' });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
        res.draft = draft;
        next();
    });
}
export default draftRouter;
//# sourceMappingURL=userDrafts.js.map