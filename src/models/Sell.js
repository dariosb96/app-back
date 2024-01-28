const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define("Sell", 
   {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT, 
      allowNull: true,
    },
    
  },
  {
    timestamps: true,
    createdAt: "date",
    updatedAt: false,
  });
};
