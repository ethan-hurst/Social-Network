const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  interests: {
    type: [String]
  },
  bio: {
    type: String
  },
  instagramUsername: {
    type: String
  },
  experience: [{
    title: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    from: {
      type: Date,
      required: false
    },
    to: {
      type: Date,
      required: false
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: false
    }
  }],
  education: [{
    school: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    fieldOfStudy: {
      type: String,
      required: true
    },
    from: {
      type: Date,
      required: false
    },
    to: {
      type: Date,
      required: false
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: false
    }
  }],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})
// eslint-disable-next-line no-undef
module.exports = Profile = mongoose.model('profile', profileSchema)
