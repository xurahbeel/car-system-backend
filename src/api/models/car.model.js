const mongoose = require('mongoose');

let CarSchema = new mongoose.Schema(
  {
    carModel: { type: String },
    price: { type: Number },
    phoneNumber: { type: Number },
    maxPictures: { type: Number, default:0 } ,
    gallery: { type: Array } , 
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', CarSchema);
