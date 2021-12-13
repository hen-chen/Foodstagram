const express = require('express')

const { isAuthenticated } = require('../middlewares/isAuthenticated')
const User = require('../models/user')

const router = express.Router()

// ======== User API ========
router.get('/api/users', async (req, res, next) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    next(new Error('Could not get users'))
  }
})

router.put('/api/add', isAuthenticated, async (req, res, next) => {
  const { _id, food } = req.body
  try {
    User.findByIdAndUpdate(
      _id,
      { $push: { foods: food } },
      (err, model) => {
        if (err !== null) res.send('Error adding Food')
      },
    )
    res.send('Food added')
  } catch (err) {
    next(new Error('could not add Food'))
  }
})

router.put('/api/friend', isAuthenticated, async (req, res, next) => {
  const { _id, friend } = req.body
  try {
    const user = await User.findOne({ username: friend })
    if (!user) res.send('Friend not added')
    else {
      User.findByIdAndUpdate(
        _id,
        { $push: { friends: friend } },
        (err, model) => {
          if (err !== null) res.send('Error adding friend')
        },
      )
      res.send('Friend added')
    }
  } catch (err) {
    next(new Error('could not add Friend'))
  }
})

router.delete('/api/deleteUser', isAuthenticated, async (req, res, next) => {
  const { _id } = req.body
  try {
    User.findByIdAndDelete(
      _id,
      (err, model) => {
        if (err !== null) res.send('Error removing user')
      },
    )
    res.send('User deleted')
  } catch (err) {
    next(new Error('could not delete user'))
  }
})

module.exports = router
