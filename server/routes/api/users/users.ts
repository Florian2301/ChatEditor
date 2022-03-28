import {NextFunction, Request, Router} from 'express'

import User from '../../../models/user/User.js'
import { UserResponse } from '../routeInterface.js'

const userRouter = Router()

// Get one User by username or get all users
userRouter.get('/', async (req: Request, res: UserResponse) => {
    if(req.query.username) {
        const username = req.query.username
        try {
            const user = await User.find({username: username})
            res.json(user)
        } catch (err: any) {
            res.status(500).json({ message: err.message })
        }
    } else {
        try {
            const users = await User.find().sort({ username: 1})
            res.json(users)
        } catch (err: any) {
            res.status(500).json({ message: err.message })
        } 
    }
})


// Create one User
userRouter.post('/', async (req: Request, res: UserResponse) => {
    const user = new User({
        username: req.body.userName,
        email: req.body.userEmail,
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err: any) {
        res.status(400).json({ message: err.message })
    } 
})


// Update one User - username / email / chats
userRouter.patch('/:id', getUser, async (req: Request, res: any) => {
    if (req.body.username !== res.user.username) {
        res.user.username = req.body.username
    }
    if (req.body.email !== res.user.email) {
        res.user.email = req.body.email
    }
    if (req.body.chats !== res.user.chats) {
        res.user.chats.push(req.body.chats)
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err: any) {
        res.status(400).json({ message: err.message})
    }
})


// Delete one User
userRouter.delete('/:id', getUser, async (req: Request, res: any) => {
    try {
        await res.user.remove()
        res.json({ message: res.user.username + " deleted" })
    } catch (err: any) {
        res.status(500).json({ message: err.message})
    }
})


async function getUser(req: Request, res: any, next: NextFunction) {
    let user
    try{
        user = await User.findById(req.params.id)
        if (user === null) {
            return res.status(404).json({ message: "Cannot find user" })
        }
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
}

export default userRouter