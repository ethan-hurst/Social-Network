const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Conversation = require('../../models/Conversation.model')

/**
 * GET Route for /api/conversations/
 * @desc Get all conversations
 * @access Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Conversation.find()
    .sort({
      date: -1
    })
    .then(conversaions => res.json(conversaions))
    .catch((err) => res.status(404).json({
      err,
      noconversaionsfound: 'There are no conversaions found!'
    }))
})

/**
 * POST Route for /api/conversations/create/
 * @description Create a new conversation
 * @access Private
 */
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {

})

module.exports = router
