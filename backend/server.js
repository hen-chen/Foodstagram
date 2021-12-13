const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')

const AccountRouter = require('./routes/account')
const APIRouter = require('./routes/api')
const { errorHandler } = require('./middlewares/errorHandler')

const app = express()

<<<<<<< HEAD
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://dbUser:dbUserPassword@cluster0.28lky.mongodb.net/188final?retryWrites=true&w=majority' /*'mongodb://localhost:27017/webDev' */
=======
const MONGO_URI = process.env.MONGODB_URI || /*'mongodb://localhost:27017/webDev'*/ 'mongodb+srv://dbUser:dbUserPassword@cluster0.28lky.mongodb.net/188final?retryWrites=true&w=majority'
>>>>>>> a0a9183308486e674cc81e4e0cc34cb61eea9b09

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))

app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 3600000,
}))

app.post('/', (req, res) => {
  if (req.session.username && req.session.password) {
    res.send(`welcome ${req.session.username}`)
  } else {
    res.send('please log in')
  }
})

app.use('/account', AccountRouter)
app.use('', APIRouter)
app.use(errorHandler)

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
// * matches every route (for frontend)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.use((err, req, res, next) => {
  res.status(500).send('There was an error!')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
