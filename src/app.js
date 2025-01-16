const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors')
const multer = require('multer');
const path = require('path');


require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(204);
//   }
//   next();
// });
// Middleware para parsear JSON
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads')); // Carpeta donde se guardarán los archivos
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
   },
});

const upload = multer({ storage });


server.use(cors({
  origin: 'http://localhost:5173', // URL front
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'], // Añadir Authorization aquí
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
}));

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.use((req, res, next) => {
  console.log(req.body); // Ver los datos recibidos
  next();
});

module.exports = {server, upload}
