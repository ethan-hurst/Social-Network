const key = require('./config/keys.js')
const express = require('express')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

mongoose.connect(key.url, {
  useNewUrlParser: true
})
  .then(() => console.log('Database Connected!'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('What are you looking at'))

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.listen(port, () => console.log(`Server running on port ${port}`))
