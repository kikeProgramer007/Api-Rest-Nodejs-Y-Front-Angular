import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Categoria = sequelize.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    }
}, 
{
    timestamps: false,
})