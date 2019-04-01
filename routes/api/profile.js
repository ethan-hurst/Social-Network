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
 * @ROUTE GET api/profile
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

/**
 * @ROUTE POST api/profile
 *@desc Create or EDIT a user profile
 *@Access Protected
 */
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const profileFields = {}
  profileFields.user = req.user.id
  if (req.body.handle) profileFields.handle = req.body.handle
  if (req.body.company) profileFields.company = req.body.company
  if (req.body.website) profileFields.website = req.body.website
  if (req.body.location) profileFields.location = req.body.location
  if (req.body.status) profileFields.status = req.body.status
  if (req.body.interests) profileFields.interests = req.body.interests
  if (req.body.bio) profileFields.bio = req.body.bio
  if (req.body.instagramUsername) profileFields.instagramUsername = req.body.instagramUsername
  if (typeof req.body.experience !== 'undefined') {
    profileFields.experience = req.body.experience.split(',')
  }
  profileFields.social = {}
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram

  if (req.body.date) profileFields.date = req.body.date
})

module.exports = router
