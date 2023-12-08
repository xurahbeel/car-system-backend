const path = require('path');
require('dotenv').config();
module.exports = {
  port: process.env.PORT,
  emailAdd: process.env.EMAIL,
  CLIENT_EMAIL: process.env.CLIENT_EMAIL,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  mongo: {
    uri: process.env.MONGO_URI,
  },
};
