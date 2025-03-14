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
            email: {
                type: DataTypes.STRING,
                unique:true,
                allowNull: true,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

    },
        {timestamps: true},
        
    );
};