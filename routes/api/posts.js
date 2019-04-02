const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Post = require('../../models/Post.model')

const validatePostInput = require('../../validation/post.validate')

/**
 * GET Route for /api/posts/test
 * @desc Test Post route
 * @access Public
 */
router.get('/test', (req, res) => {
  res.json({
    msg: 'Posts Works'
  })
})

/**
 * POST Route for /api/posts/
 * @desc Create a new Post
 * @access Private
 */
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validatePostInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  })
  newPost.save()
    .then(post => res.json(post))
})

module.exports = router
