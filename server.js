const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('dist'))

app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(3000, () => {
  console.log('Listening on port 3000...')
})