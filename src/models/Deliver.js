const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define("Deliver", 
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
  },
  {
    timestamps: true,
    createdAt: "date",
    updatedAt: false,
  });


};
