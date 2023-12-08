const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
  {
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
