const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const mainRoutes = require('../api/routes/v1/main/index');
const path = require('path');
const rateLimit = require("express-rate-limit");
const bearerToken = require('express-bearer-token');
const compression = require('compression');

/**
* Express instance
* @public
*/
const app = express();




app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bearerToken());

app.use(methodOverride());
const apiRequestLimiterAll = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 90000
});

 app.use(express.static(path.join(__dirname, "../uploads")));

app.use("/v1/", apiRequestLimiterAll);

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(compression());

app.use('/v1', mainRoutes);

app.get('/', (req ,res,next)=>{
  res.send("here we are")
})

module.exports = app;
