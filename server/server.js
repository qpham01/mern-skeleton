import express from 'express'
import config from './../config/config'
import app from './express'

// dev only
import devBundle from './devBundle'

// dev only
devBundle.compile(app);

// server bundled static files from dist folder
import path from 'path'
const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// serves template.js for home route (/)
import template from './../template';
app.get('/', (req, res) => {
     res.status(200).send(template());
})

// connect to mongodb using Mongoose
import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})