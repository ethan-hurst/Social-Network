const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validateProfileInput = require('../../validation/profile.validate')

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
  })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
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
 * @ROUTE GET api/profile/:handle
 *@desc Get Profile by Handle
 *@Access Private
 */
router.get('/:handle', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const errors = {}
  Profile.findOne({
    handle: req.params.handle
  }).populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no Profile for this user'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

/**
 * @ROUTE GET api/profile/:user_id
 *@desc Get Profile by user ID
 *@Access Private
 */
router.get('/user/:user_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const errors = {}
  Profile.findOne({
    user: req.params.user_id
  }).populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no Profile for this user'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

/**
 * @ROUTE POST api/profile
 *@desc Create or EDIT a user profile
 *@Access Protected
 */
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateProfileInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const profileFields = {}
  profileFields.user = req.user.id
  if (req.body.handle) profileFields.handle = req.body.handle
  if (req.body.company) profileFields.company = req.body.company
  if (req.body.website) profileFields.website = req.body.website
  if (req.body.location) profileFields.location = req.body.location
  if (req.body.bio) profileFields.bio = req.body.bio
  if (req.body.status) profileFields.status = req.body.status
  if (req.body.githubusername) {
    profileFields.githubusername = req.body.githubusername
  }
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',')
  }
  profileFields.social = {}
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram
  Profile.findOne({
    user: req.user.id
  })
    .then(profile => {
      if (profile) {
        Profile.findOneAndUpdate({
          user: req.user.id
        }, {
          $set: profileFields
        }, {
          new: true
        }).then(profile => res.json(profile))
          .catch(err => console.log(err))
      } else {
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists, please choose another.'
            res.status(400).json(errors)
          }
          new Profile(profile)
            .save()
            .then(profile => res.json(profile))
        }).catch(err => console.log(err))
      }
    }).catch(err => console.log(err))
})

module.exports = router
