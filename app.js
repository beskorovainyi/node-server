const express = require('express');
const chalk = require("chalk");
const bodyParser = require("body-parser");
const app = express()
const port = 6000
const authRoutes = require('./routes/auth-routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(__dirname + '/public'));

app.use('/', authRoutes);


const server = app.listen(port, (error) => {
  if (error) return (
      console.log(`Error: ${error}`)
  )
  console.log(chalk.green(`Server listening on port: ${server.address().port}`))
})