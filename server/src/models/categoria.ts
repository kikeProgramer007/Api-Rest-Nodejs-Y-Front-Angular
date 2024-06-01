import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Product } from './product';

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

// //Uno a muchos
// Categoria.hasMany(Product,{
//     foreignKey:'idCategoria'
// })