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

router.post('/api/add', isAuthenticated, async (req, res, next) => {
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

module.exports = router
