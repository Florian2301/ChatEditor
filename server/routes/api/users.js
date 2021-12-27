const express = require('express')
const router = express.Router()

// Users Model
const User = require('../../models/User')


// Get one User by username or get all users
router.get('/', async (req, res) => {
    if(req.query.username) {
        const username = req.query.username
        try {
            const user = await User.find({username: username})
            res.json(user)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    } else {
        try {
            const users = await User.find().sort({ username: 1})
            res.json(users)
        } catch (err) {
            res.status(500).json({ message: err.message })
        } 
    }
})


// Create one User
router.post('/', async (req, res) => {
    const user = new Users({
        username: req.body.userName,
        email: req.body.userEmail,
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    } 
})


// Update one User - username / email / chats
router.patch('/:id', getUser, async (req, res) => {
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
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})


// Delete one User
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: res.user.username + " deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})


async function getUser(req, res, next) {
    let user
    try{
        user = await User.findById(req.params.id)
        if (user === null) {
            return res.status(404).json({ message: "Cannot find user" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
}

module.exports = router