import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Categoria } from './categoria';

export const Product = sequelize.define('product', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.FLOAT
    },
    stock: {
        type: DataTypes.INTEGER
    },
    id_categoria: {
        type: DataTypes.INTEGER
   }
}, 
{
    timestamps: false,
})

// Define the association

Categoria.hasMany(Product,{ foreignKey: 'id_categoria'});
Product.belongsTo(Categoria,{foreignKey: 'id_categoria'});
