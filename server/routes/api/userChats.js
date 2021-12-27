const express = require('express')
const router = express.Router()

// Chat Model
const Chat = require('../../models/Chat')

// Get all chats from user
router.get('/', async (req, res) => {
  try {
    const chat = await Chat.find({ userId: req.query.userId }).sort({
      chatnumber: 1,
    })
    res.json(chat)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one chat by id
router.get('/:id', getChat, (req, res) => {
  res.json(res.chat)
})

// Creating one Chat
router.post('/', async (req, res) => {
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
  })
  req.body.tags.map((tag) => {
    chat.tags.push(tag)
  })
  req.body.messages.map((message) => {
    chat.messages.push(message)
  })
  req.body.philosopher.map((phil) => {
    chat.philosopher.push(phil)
  })
  try {
    const newChat = await chat.save()
    res.status(201).json(newChat)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating Chatdetails
router.patch('/:id', getChat, async (req, res) => {
  if (req.body.chatnumber !== res.chat.chatnumber) {
    res.chat.chatnumber = req.body.chatnumber
  }
  if (req.body.title !== res.chat.title) {
    res.chat.title = req.body.title
  }
  if (req.body.author !== res.chat.author) {
    res.chat.author = req.body.author
  }
  if (req.body.date !== res.chat.date) {
    res.chat.date = req.body.date
  }
  if (req.body.language !== res.chat.language) {
    res.chat.language = req.body.language
  }
  if (req.body.tags !== res.chat.tags) {
    res.chat.tags = req.body.tags
  }
  if (req.body.description !== res.chat.description) {
    res.chat.description = req.body.description
  }
  if (req.body.comments !== res.chat.comments) {
    res.chat.comments = req.body.comments
  }
  try {
    const updatedChat = await res.chat.save()
    res.json(updatedChat)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating Chat messages
router.put('/:id', getChat, async (req, res) => {
  res.chat.messages.map((message) => {
    if (message.messagenumber === req.body.messagenumber) {
      message.text = req.body.text
      return message.text
    }
    return message.text
  })
  try {
    const updatedChat = await res.chat.save()
    res.json(updatedChat)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting one Chat
router.delete('/:id', getChat, async (req, res) => {
  try {
    await res.chat.remove()
    res.json({ message: 'Deleted message' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getChat(req, res, next) {
  let chat
  try {
    chat = await Chat.findById(req.params.id)
    if (chat === null) {
      return res.status(404).json({ message: 'Cannot find chat' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.chat = chat
  next()
}

module.exports = router
