const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Activity', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        difficulty: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allowNull: false,
        },
        season: {
            type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
            allowNull: false,
        }
    },
        { timestamps: false })
}