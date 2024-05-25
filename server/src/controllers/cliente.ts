import { Request, Response } from 'express';
import { Cliente } from '../models/cliente';

export const GetLista = async (req: Request, res: Response) => {
    const lstAll = await Cliente.findAll();
    res.json(lstAll)
}

export const Buscar = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Actualizamos cliente en la base de datos
        const oCliente = await Cliente.findOne({ where: { id } });
        
        if (oCliente) {
            res.status(200).json(oCliente);
        } else {
            res.status(404).json({
                msg: 'Cliente no encontrado',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}

export const Crear = async (req: Request, res: Response) => {
    const{ nombre,ci }= req.body;
    try {
        // Guardarmos cliente en la base de datos
        if (nombre == null) {
            throw new Error("El nombre no puede ser nulo");
        }
        await Cliente.create({
            nombre: nombre,
            ci: ci,
        })
    
        res.json({
            msg: `Cliente  ${nombre} creado exitosamente!`
        })
    } catch (error: any) {
        res.status(400).json({
            msg: 'Upps, ocurrió un error',
            error: {message: error.message}
        });
    }
}

export const Modificar = async (req: Request, res: Response) => {
    var { id } = req.params;
    var{ nombre,ci }= req.body;
    try {
           // Buscar el cliente actual en la base de datos
           var oCliente = await Cliente.findOne({ where: { id } });
        
           if (!oCliente) {
               return res.status(404).json({
                   msg: 'Cliente no encontrado',
               });
           }
   
           // Actualizamos el cliente en la base de datos
           const [updated] = await Cliente.update({
               nombre: nombre,
               ci: ci,
           }, { where: { id } });
   
           if (updated) {
               const cliente = await Cliente.findOne({ where: { id } });
               res.status(200).json({
                   msg: `Cliente ${nombre} actualizado exitosamente!`,
                   product: cliente
               });
           } else {
               res.status(200).json({
                msg: 'No hay cambios para actualizar',
               });
           }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}
export const Eliminar = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Eliminar cliente en la base de datos
        const deleted = await Cliente.destroy({
            where: { id }
        });
    
        if (deleted) {
            res.status(200).json({
                msg: `Cliente con ID ${id} eliminado exitosamente!`
            });
        } else {
            res.status(404).json({
                msg: 'Cliente no encontrado',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps, ocurrió un error',
            error
        })
    }
}