const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validateProfileInput = require('../../validation/profile.validate')
const validateExperienceInput = require('../../validation/experience.validate')
const validateEducationInput = require('../../validation/education.validate')

const User = require('../../models/User.model')
const Profile = require('../../models/Profile.model')

/**
 * Get Route for /api/profile/test
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
 * @ROUTE GET api/profile/:user_id
 *@desc Get Profile by user ID
 *@Access Private
 */
router.get('/all', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const errors = {}
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles'
        return res.status(404).json(errors)
      }
      res.json(profiles)
    })
    .catch(err => res.status(404).json({
      err,
      profile: 'There are no profiles'
    }))
})

/**
 * @ROUTE GET api/profile/handle/:handle
 *@desc Get Profile by Handle
 *@Access Private
 */
router.get('/handle/:handle', (req, res) => {
  const errors = {}
  Profile.findOne({
    handle: req.params.handle
  })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

/**
 * @ROUTE GET api/profile/user/:user_id
 *@desc Get Profile by user ID
 *@Access Private
 */

router.get('/user/:user_id', (req, res) => {
  const errors = {}
  Profile.findOne({
    user: req.params.user_id
  })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err =>
      res.status(404).json({
        err,
        profile: 'There is no profile for this user'
      })
    )
})

/**
 * @ROUTE POST api/profile
 *@desc Create or EDIT a user profile
 *@Access Private
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
  }).then(profile => {
    if (profile) {
      Profile.findOneAndUpdate({
        user: req.user.id
      }, {
        $set: profileFields
      }, {
        new: true
      }).then(profile => res.json(profile))
    } else {
      Profile.findOne({
        handle: profileFields.handle
      }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists'
          res.status(400).json(errors)
        }
        new Profile(profileFields).save().then(profile => res.json(profile))
      })
    }
  })
})

/***
 * @Route POST api/profile/experience
 * @description Add Experience to profile
 * @access Private
 */
router.post('/experience', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateExperienceInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    }
    profile.experience.unshift(newExp)
    profile.save()
      .then(profile => res.json(profile))
  })
})

/***
 * @Route POST api/profile/education
 * @description Add Education to profile
 * @access Private
 */
router.post('/education', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateEducationInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    }
    profile.education.unshift(newEdu)
    profile.save()
      .then(profile => res.json(profile))
  })
})

/***
 * @Route DELETE api/profile/experience/:exp_id
 * @description Delete Experience from profile
 * @access Private
 */
router.delete('/experience/:exp_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
    user: req.user.id
  })
    .then(profile => {
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id)
      profile.experience
        .splice(removeIndex)
      profile.save()
        .then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json(err))
})

/***
 * @Route DELETE api/profile/education/:edu_id
 * @description Delete Education from profile
 * @access Private
 */
router.delete('/education/:edu_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
    user: req.user.id
  })
    .then(profile => {
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id)
      profile.education
        .splice(removeIndex)
      profile.save()
        .then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json(err))
})

/***
 * @Route DELETE api/profile
 * @description Delete User and Profile
 * @access Private
 */
router.delete('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOneAndRemove({
    user: req.user.id
  }).then(() => {
    User.findOneAndRemove({
      _id: req.user.id
    }).then(() => res.json({
      msg: 'Profile and User removed!'
    }))
  })
})

module.exports = router
