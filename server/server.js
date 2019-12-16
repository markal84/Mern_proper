const express = require('express');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const helmet = require('helmet'); //basic security
const loadTestData = require('./testData');
const sanitize = require('mongo-sanitize'); // security fix exercise
const path = require('path'); //heroku integration

// import routes
const postRoutes = require('./routes/post.routes');

const app = express();

// middleware - cors and express
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => { //security fix exercise
  sanitize(req.body);
  next();
});
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

//routes
app.use('/api', postRoutes);

// connects our back end code with the database
mongoose.connect(process.env.DB, { useNewUrlParser: true });
let db = mongoose.connection;

app.get('*', (req, res) => { //heroku integration
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

db.once('open', () => {
  console.log('Connected to the database');
  loadTestData();
});
db.on('error', (err) => console.log('Error ' + err));

//server start
app.listen(config.PORT, function(){
    console.log('Server is running on port:', config.PORT);
});