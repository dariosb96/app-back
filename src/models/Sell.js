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
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:1,
        max: 12,
      }
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 31,
      }
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    }
    
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: false,
  });
};
