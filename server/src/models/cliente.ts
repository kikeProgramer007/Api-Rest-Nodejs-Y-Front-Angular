import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Cliente = sequelize.define('cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    ci: {
        type: DataTypes.INTEGER
    }
}, 
{
    timestamps: false,
})