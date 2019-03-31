const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

const User = require('../../models/User')

/**
 * Get Route for /api/users/test
 * @desc Test Users route
 * @access Public
 */
router.get('/test', (req, res) => {
  res.json({
    msg: 'Users Works'
  })
})

/**
 * Get Route for /api/users/register
 * @desc Register Users
 * @access Public
 */
router.post('/register', (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: 'Existing User with Specified Email Address!'
      })
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'r',
        default: 'mm'
      })
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      })
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  }).catch()
  console.log(`User ${req.body.name} was created with email ${req.body.email}`)
})

/**
 * Get Route for /api/users/login
 * @desc Login Users by return json web token
 * @access Public
 */
router.post('/login', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const email = req.body.email
  const password = req.body.password
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      return res.status(404).json({
        email: 'Email or Password incorrect'
      })
    }
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          res.json({
            msg: 'Success!'
          })
        }
        return res.status(400).json({
          password: 'Email or Password incorrect'
        })
      })
      .catch()
  }).catch()
})

module.exports = router
