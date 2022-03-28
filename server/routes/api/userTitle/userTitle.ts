import { NextFunction, Request, Response, Router } from 'express'

import Title from '../../../models/title/Title.js'
import { TitleResponse } from '../routeInterface.js'

const titleRouter = Router()

// Get all Titles
titleRouter.get('/', async (req: Request, res: Response) => {
  if (req.query.userId) {
    // get all Titles from logged in user
    try {
      const title = await Title.find({userId: req.query.userId})
      res.json(title)
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  } else {
    // get all titles and sort by user and chatnumber
    try {
      const title = await Title.find().sort({ author: 1, chatnumber: 1 })
      res.json(title)
    } catch (err: any) {
      res.status(500).json({ message: err.message })
    }
  }
})

// Get one Title
titleRouter.get('/:id', getTitle, (req: Request, res: TitleResponse) => {
  res.json(res.title)
})

// Creating one Title
titleRouter.post('/', async (req: Request, res: Response) => {
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
  })
  try {
    const newTitle = await title.save()
    res.status(201).json(newTitle)
    // 201 means successfully created a new object
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  } // 400 means client-side-issue (e.g. wrong user input)
})

// Updating one Title
titleRouter.patch('/:id', getTitle, async (req: Request, res: any) => {
  if (req.body.chatnumber !== res.title.chatnumber) {
    res.title.chatnumber = req.body.chatnumber
  }
  if (req.body.title !== res.title.title) {
    res.title.title = req.body.title
  }
  if (req.body.author !== res.title.author) {
    res.title.author = req.body.author
  }
  if (req.body.date !== res.title.date) {
    res.title.date = req.body.date
  }
  if (req.body.language !== res.title.language) {
    res.title.language = req.body.language
  }
  if (req.body.tags !== res.title.tags) {
    res.title.tags = req.body.tags
  }
  if (req.body.description !== res.title.description) {
    res.title.description = req.body.description
  }
  if (req.body.admin !== res.title.admin) {
    res.title.admin = req.body.admin
  }
  try {
    const updatedTitle = await res.title.save()
    res.json(updatedTitle)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting one Title
titleRouter.delete('/:id', getTitle, async (req: Request, res: any) => {
  try {
    await res.title.remove()
    res.json({ message: 'Deleted title' })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

async function getTitle (req: Request, res: any, next: NextFunction) {
  let title
  try {
    title = await Title.findById(req.params.id)
    if (title === null) {
      return res.status(404).json({ message: 'Cannot find title' })
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
  res.title = title
  next()
}

export default titleRouter