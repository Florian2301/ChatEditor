import {Router, Request, NextFunction } from 'express'
import { ChatResponse, Messages, Philosopher } from '../routeInterface.js'
import Chat from '../../../models/chat/Chat.js'

const chatRouter = Router()

// Get all chats from user
chatRouter.get('/', async (req: Request, res: ChatResponse) => {
  try {
    const chat = await Chat.find({ userId: req.query.userId }).sort({
      chatnumber: 1,
    })
    res.json(chat)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// Get one chat by id
chatRouter.get('/:id', getChat, (req: Request, res: ChatResponse) => {
  res.json(res.chat)
})

// Creating one Chat
chatRouter.post('/', async (req: Request, res: ChatResponse) => {
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
  req.body.tags.map((tag: string[]) => {
    chat.tags.push(tag)
  })
  req.body.messages.map((message: Messages) => {
    chat.messages.push(message)
  })
  req.body.philosopher.map((phil: Philosopher) => {
    chat.philosopher.push(phil)
  })
  try {
    const newChat = await chat.save()
    res.status(201).json(newChat)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

// Updating Chatdetails
chatRouter.patch('/:id', getChat, async (req: Request, res: any) => {
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
  if (req.body.admin !== res.chat.admin) {
    res.chat.admin = req.body.admin
  }
  if (req.body.comments !== res.chat.comments) {
    res.chat.comments = req.body.comments
  }
  try {
    const updatedChat = await res.chat.save()
    res.json(updatedChat)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

// Updating Chat messages
chatRouter.put('/:id', getChat, async (req: Request, res: any) => {
  res.chat.messages.map((message: Messages) => {
    if (message.messagenumber === req.body.messagenumber) {
      message.text = req.body.text
      return message.text
    }
    return message.text
  })
  try {
    const updatedChat = await res.chat.save()
    res.json(updatedChat)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting one Chat
chatRouter.delete('/:id', getChat, async (req: Request, res: any) => {
  try {
    await res.chat.remove()
    res.json({ message: 'Deleted message' })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

async function getChat(req: Request, res: any, next: NextFunction) {
  let chat
  try {
    chat = await Chat.findById(req.params.id)
    if (chat === null) {
      return res.status(404).json({ message: 'Cannot find chat' })
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
  res.chat = chat
  next()
}

export default chatRouter
