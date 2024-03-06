const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "User",
        {   
            id: {
                type: DataTypes.UUID,
                defautlValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name:{
                type:DataTypes.STRING,
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                unique:true,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defautlValue: false,
            },

    },
        {timestamps: false}
    );
};