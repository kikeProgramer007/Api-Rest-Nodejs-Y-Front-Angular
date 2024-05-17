import { Sequelize } from "sequelize";


const sequelize = new Sequelize('bd_restaurante', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;