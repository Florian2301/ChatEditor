import express from 'express';
import bodyParser from 'body-parser';
import chatRouter from './routes/api/userChats/userChats.js';
import draftRouter from './routes/api/UserDrafts/userDrafts.js';
//import mongoURI from './config/keys.js' // only in dev-mode available
import mongoose from 'mongoose';
import path from 'path';
import titleRouter from './routes/api/userTitle/userTitle.js';
import userRouter from './routes/api/users/users.js';
const app = express();
// BodyParser Middleware
app.use(bodyParser.json());
// DB Config
const db = process.env.mongoURI; //|| mongoURI
// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
app.use('/api/chats', chatRouter);
app.use('/api/title', titleRouter);
app.use('/api/drafts', draftRouter);
app.use('/api/users', userRouter);
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
//# sourceMappingURL=server.js.map