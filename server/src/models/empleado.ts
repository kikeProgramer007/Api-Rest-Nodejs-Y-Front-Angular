import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Empleado = sequelize.define('empleado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.INTEGER
    },
    direccion: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
}, 
{
    timestamps: false,
})