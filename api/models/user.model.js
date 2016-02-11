'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: {type: [Number], index: '2dsphere'}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
