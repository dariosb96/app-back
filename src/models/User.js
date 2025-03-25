const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "User",
        {   
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                 primaryKey: true,
            },
            name:{
                type:DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull:false,
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('superadmin', 'admin', 'employee'), // ✅ CORRECTO
                allowNull: true,
                defaultValue: "employee"
            },
            approved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            email: {
                type: DataTypes.STRING,
                unique:true,
                allowNull: true,
            },
            adminId: { 
                type: DataTypes.UUID, // CAMBIO: ahora es UUID
                references: {
                  model: 'Users',
                  key: 'id',
                },
                allowNull: true,
              },

    },
        {timestamps: true},
        
    );
};