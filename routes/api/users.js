const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

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
  const email = req.body.email
  const password = req.body.password
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      return res.status(404).json({
        email: 'Email incorrect'
      })
    }
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          }
          jwt.sign(payload, keys.secret, {
            expiresIn: '2h'
          }, (err, token) => {
            if (err) throw err
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          })
        } else {
          return res.status(400).json({
            password: 'Password incorrect'
          })
        }
      })
      .catch()
  }).catch()
})

/**
 * Get Route for /api/users/current
 * @desc Returns the user the token belongs to
 * @access Protected
 */
router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})
module.exports = router
