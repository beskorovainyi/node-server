const express = require('express');
const config = require('config')
const chalk = require("chalk");
const bodyParser = require("body-parser");
const app = express();
const port = config.get('port') || 8080;
const authRoutes = require("./routes/auth-routes");
const registrationRoute = require("./routes/registration-route");
const loginRoute = require("./routes/login-route")
const corsMiddleware = require('./middleware/cors.middleware');
const mongoose = require('mongoose');
// const {config} = require("winston");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(__dirname + '/public'));

app.use(corsMiddleware)
app.use('/', authRoutes)
app.use('/', registrationRoute)
app.use('/', loginRoute)


mongoose.connect(config.get('mongoUri'), {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('connect to db')
})


const server = app.listen(port, (error) => {
  if (error) return (
      console.log(`Error: ${error}`)
  )
  console.log(chalk.green(`Server listening on port: ${server.address().port}`))
})