const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const User = require('../../models/User.model')
const Profile = require('../../models/Profile.model')

/**
 * Get Route for /api/profiles/test
 * @desc Test Profile route
 * @access Public
 */
router.get('/test', (req, res) => {
  res.json({
    msg: 'Profile Works'
  })
})

/**
 *@desc Get Current logged in users profile
 *@Access Protected
 */
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const errors = {}
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    if (!profile) {
      errors.noprofile = 'There is no profile for this user!'
      return res.status(404).json(errors)
    }
    res.json(profile)
  }).catch(err => {
    res.status(404).json(err)
  })
})

module.exports = router
