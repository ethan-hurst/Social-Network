const keys = require('./config/keys.js')
const express = require('express')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

var memjs = require('memjs')

var mc = memjs.Client.create(process.env.MEMCACHIER_SERVERS, {
  failover: true,  // default: false
  timeout: 1,      // default: 0.5 (seconds)
  keepAlive: true  // default: false
})

mc.set('hello', 'memcachier', {expires:0}, function(err, val) {
  if(err != null) {
    console.log('Error setting value: ' + err)
  }
})

mc.get('hello', function(err, val) {
  if(err != null) {
    console.log('Error getting value: ' + err)
  }
  else {
    console.log(val.toString('utf8'))
  }
})

const app = express()
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

mongoose.connect(keys.url, {
  useNewUrlParser: true
})
  .then(() => console.log('Database Connected!'))
  .catch(err => console.log(err))

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => console.log(`Server running on port ${port}`))
