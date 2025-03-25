require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

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

 // LOCAL

const sequelize = new Sequelize(
   `postgres://${DB_USER_LOCAL}:${DB_PASSWORD_LOCAL}@${DB_HOST_LOCAL}:${DB_PORT_LOCAL}/${DB_NAME_LOCAL}`,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   }
);


// RAILWAY DEPLOY


// const DB_HOST = process.env.NODE_ENV === 'production' ? 'postgres.railway.internal' : 'localhost';

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//    logging: false,
//    dialectOptions: {
//      ssl: {
//        require: true,
//        rejectUnauthorized: false,
//      },
//    },
// });



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



const { Product, Sell, User, ProductSell } = sequelize.models;

// Relaciones de usuario (Superadmin, Admin, Employee)
User.hasMany(User, { as: 'Employees', foreignKey: 'adminId' }); // Un Admin tiene muchos Employees
User.belongsTo(User, { as: 'Admin', foreignKey: 'adminId' }); // Un Employee pertenece a un Admin

User.hasMany(Product, { foreignKey: 'adminId' });
Product.belongsTo(User, { as: 'Admin', foreignKey: 'adminId' });

User.hasMany(Sell, { foreignKey: 'userId' });
Sell.belongsTo(User, { foreignKey: 'userId' });

Product.belongsToMany(Sell, {
    through: ProductSell,
    foreignKey: 'ProductId',
    otherKey: 'SellId'
});

Sell.belongsToMany(Product, {
    through: ProductSell,
    foreignKey: 'SellId',
    otherKey: 'ProductId'
});

module.exports = {
   ...sequelize.models,
   conn: sequelize,
};

