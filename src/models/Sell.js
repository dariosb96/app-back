const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define("Sell", 
   {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
       place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
       status: {
      type: DataTypes.STRING,
      defaultValue: false,
    }
    
  },
  {
    timestamps: true,
    createdAt: "date",
    updatedAt: false,
  });
};
