require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const bodyParser = require('body-parser');
const schema = require('./schema/shema');
const app = express();
const PORT = process.env.PORT || 5000;

const {
  uploadToServer,
  deletePhotosS3
} = require('./photosHendlers');

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Headers', 'origin, contenttype, accept');
  next()
})

app.use(express.json({ extended: true }));

app.use('/auth', require('./routes/login.router'));

mongoose.connect(`mongodb+srv://adminUser:TkjZe0KejzaVkeXs@testtask.g8enc.mongodb.net/testtask?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })


app.post('/upload', upload.any('uploaded_file'), uploadToServer)

app.post('/deletePhotoS3', bodyParser.text(), (req, res) => deletePhotosS3(req, res))

app.use(express.static('build'));
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const dbContection = mongoose.connection;
dbContection.on('error', err => console.log(`Contection error: ${err}`));
dbContection.once('open', () => console.log('Connected to DB'))

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});