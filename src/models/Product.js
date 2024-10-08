const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1,
            },
            name: {
                type:  DataTypes.STRING,
                allowNull: false,
            }, 
            category: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true, 
                },
            },
            color: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: null,
            },
            image: {
                type: DataTypes.STRING,
                isUrl: true,
            },
            imageCloudinary: {
          type: DataTypes.ARRAY(DataTypes.JSON),
          allowNull: true, 
            },
            isAvailable: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            buyprice: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE",
            }
        },
        { timestamps: false }
    );
};