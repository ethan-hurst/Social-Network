const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conversationSchema = new Schema({
  fromUser: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  toUser: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  messageText: {
    type: String,
    required: true
  },
  fromAvatar: {
    type: String
  },
  toAvatar: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// eslint-disable-next-line no-undef
module.exports = Conversation = mongoose.model('conversation', conversationSchema)
