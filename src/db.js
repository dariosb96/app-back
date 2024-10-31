require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const {
   DB_USER_LOCAL,
   DB_PASSWORD_LOCAL,
   DB_HOST_LOCAL,
   DB_NAME_LOCAL,
   DB_PORT_LOCAL,
   DB_USER_RAILWAY,
   DB_PASSWORD_RAILWAY,
   DB_HOST_RAILWAY,
   DB_NAME_RAILWAY,
   DB_PORT_RAILWAY
 } = process.env;
 
// const sequelize = new Sequelize(
//    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
//    {
//       logging: false, // set to console.log to see the raw SQL queries
//       native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//    }
// );
const DB_HOST = process.env.NODE_ENV === 'production' ? 'postgres.railway.internal' : 'localhost';



// asegúrate de que esto esté en la parte superior

const sequelize = new Sequelize(process.env.DATABASE_URL, {
   logging: false,
   dialectOptions: {
     ssl: {
       require: true,
       rejectUnauthorized: false,
     },
   },
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&  
         file.slice(-3) === '.js'              
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

// Injectamos la co nexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Product, Sell } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Product.belongsToMany(Sell, { through: 'ProductSell' });
Sell.belongsToMany(Product, { through: 'ProductSell' });


module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
