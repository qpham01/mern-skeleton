import express from 'express'

// dev only
import devBundle from './devBundle'

const app = express();

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

// connect to mongodb
import { MongoClient } from 'mongodb';
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_simple';
MongoClient.connect(url, (err, db)=>{
  console.log("Connected successfully to mongodb server");
  db.close();
})

// listen on port
let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', port);
})