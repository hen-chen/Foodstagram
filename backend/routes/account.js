const express = require('express')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

const router = express.Router()

const User = require('../models/user')

router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.send('fetch all users has problems')
  }
})

router.get('/check', (req, res) => {
  if (req.session.username === undefined || req.session.username === null) {
    res.send('user not logged in')
  } else {
    res.send(req.session.username)
  }
})

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body

  try {
    await User.create({
      username, password,
    })
    req.session.username = username
    req.session.password = password
    res.send('user created')
  } catch (err) {
    next(new Error('user creation has problems'))
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.send('user does not exist')
    } else {
      const { password: passDB } = user

      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        res.send('user logged in successfully')
      } else {
        res.send('user credentials are wrong')
      }
    }
  } catch (err) {
    next(new Error('user login has problems'))
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user is logged out')
})

module.exports = router
