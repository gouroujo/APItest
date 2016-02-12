'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  position : {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  }
}, { timestamps: true });

userSchema.index({ position : '2dsphere' });

module.exports = mongoose.model('User', userSchema);
