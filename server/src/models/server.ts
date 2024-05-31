import express, { Application } from 'express';
import cors from 'cors';
import routeCategoria from '../routes/categoria';
import routesProduct from '../routes/product';
import routesCliente from '../routes/cliente';
import routesEmpleado from '../routes/empleado';
import routesUser from '../routes/user';
import { Product } from './product';
import { User } from './user';
import { Categoria } from './categoria';
import { Cliente } from './cliente';
import { Empleado } from './empleado';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/categorias', routeCategoria);
        this.app.use('/api/clientes', routesCliente);
        this.app.use('/api/empleados', routesEmpleado);
    }

    midlewares() {
        // Parseo body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await Empleado.sync();
            await Cliente.sync();
            await Categoria.sync()
            await Product.sync()
            await User.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;