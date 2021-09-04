const express = require('express');
const chalk = require("chalk");
const app = express()
const port = 6000


const server = app.listen(port, (error) => {
  if (error) return (
      console.log(`Error: ${error}`)
  )
  console.log(chalk.green(`Server listening on port: ${server.address().port}`))
})