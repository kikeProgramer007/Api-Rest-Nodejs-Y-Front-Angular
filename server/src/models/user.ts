import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Empleado } from './empleado';

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, )

Empleado.hasOne(User,{ foreignKey: 'id_empleado'});
User.belongsTo(Empleado,{foreignKey: 'id_empleado'});
