import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Cliente } from './cliente';
import { Empleado } from './empleado';

export const Notaventa = sequelize.define('notaventa', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE
    },
    monto: {
        type: DataTypes.FLOAT
    },
    estado: {
        type: DataTypes.TINYINT,
        // allowNull: false,
        // references: {
        //   model: Categoria,
        //   key: 'id'
        // }
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    id_empleado: {
        type: DataTypes.INTEGER
    },
}, 
{
    timestamps: false,
})

// Define the association

Cliente.hasMany(Notaventa,{ foreignKey: 'id_cliente'});
Notaventa.belongsTo(Cliente,{foreignKey: 'id_cliente'});

Empleado.hasMany(Notaventa,{ foreignKey: 'id_empleado'});
Notaventa.belongsTo(Empleado,{foreignKey: 'id_empleado'});
