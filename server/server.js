const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

// BodyParser Middleware
app.use(bodyParser.json())

// DB Config
const db = process.env.mongoURI || require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

// Use Routes
const chats = require('./routes/api/userChats')
app.use('/api/chats', chats)

const title = require('./routes/api/userTitle')
app.use('/api/title', title)

const drafts = require('./routes/api/userDrafts')
app.use('/api/drafts', drafts)

const users = require('./routes/api/users')
app.use('/api/users', users)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
