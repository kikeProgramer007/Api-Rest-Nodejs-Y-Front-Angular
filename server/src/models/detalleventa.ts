import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Product } from './product';
import { Notaventa } from './notaventa';

export const Detalleventa = sequelize.define('detalleventa', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
     id_venta: {
         type: DataTypes.INTEGER
     },
     id_producto: {
         type: DataTypes.INTEGER
     },
    cantidad: {
        type: DataTypes.INTEGER
    },
    precio_v: {
        type: DataTypes.FLOAT
    }
}, 
{
    timestamps: false,
})

// Define the association
Product.belongsToMany(Notaventa, { through: Detalleventa, foreignKey: 'id_producto' });
Notaventa.belongsToMany(Product, { through: Detalleventa, foreignKey: 'id_venta'});