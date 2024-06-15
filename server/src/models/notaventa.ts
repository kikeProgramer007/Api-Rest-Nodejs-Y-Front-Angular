import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Cliente } from './cliente';
import { User } from './user';
import { Detalleventa } from './detalleventa';
import { Product } from './product';

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
    tipopago: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        // allowNull: false,
        // references: {
        //   model: Categoria,
        //   key: 'id'
        // }
    },
    id_cliente: {
        type: DataTypes.INTEGER
    },
    id_usuario: {
        type: DataTypes.INTEGER
    },
}, 
{
    timestamps: false,
})

// Define the association

Cliente.hasMany(Notaventa,{ foreignKey: 'id_cliente'});
Notaventa.belongsTo(Cliente,{foreignKey: 'id_cliente'});

User.hasMany(Notaventa,{ foreignKey: 'id_usuario'});
Notaventa.belongsTo(User,{foreignKey: 'id_usuario'});
