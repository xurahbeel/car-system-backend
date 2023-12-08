const mongoose = require('mongoose');
const { mongo, env } = require('./vars');

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
  console.log(err);
  process.exit(-1);
});

if (env === 'development') {
  mongoose.set('debug', true);
}

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
exports.connect = () => {
    try{
      console.log("mongo.uri: " ,mongo.uri)
        mongoose.connect(mongo.uri, {
            useNewUrlParser: true,
            keepAlive: 1,
          } 
        );
        console.log("here is mongo connected")
        return mongoose.connection;
    }
    catch (error){
      console.log("error: ",error)
      throw error;
    }

};
