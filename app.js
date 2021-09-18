const express = require('express');
const chalk = require("chalk");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const authRoutes = require("./routes/auth-routes");
const corsMiddleweare = require('./middleweare/cors.middleweare')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(__dirname + '/public'));

app.use(corsMiddleweare)
app.use('/', authRoutes);


const server = app.listen(port, (error) => {
  if (error) return (
      console.log(`Error: ${error}`)
  )
  console.log(chalk.green(`Server listening on port: ${server.address().port}`))
})