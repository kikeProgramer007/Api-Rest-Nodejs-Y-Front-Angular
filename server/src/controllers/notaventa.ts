import { Request, Response } from 'express';
import { Notaventa } from '../models/notaventa';
import { Cliente } from '../models/cliente';
import { User } from '../models/user';

export const getNotaventas = async (req: Request, res: Response) => {
    const listNotaventas = await Notaventa.findAll({
        include: [
            { model: Cliente },
            { model: User }
        ]
    });
    res.json(listNotaventas)
}

export const GetNotaventa = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Actualizamos Notaventao en la base de datos
        const SetNotaventa = await Notaventa.findOne({
            include: [
                { model: Cliente },
                { model: User }
            ],
         where: { id } });
        
        if (SetNotaventa) {
            res.status(200).json(SetNotaventa);
        } else {
            res.status(404).json({
                msg: 'Notaventa no encontrado',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
} 

export const NewNotaventa = async (req: Request, res: Response) => {
    const{ fecha, monto, tipopago, estado, id_cliente, id_usuario}= req.body;
    try {
        // Guardarmos Notaventao en la base de datos
        await Notaventa.create({
            fecha: fecha,
            monto: monto,
            tipopago: tipopago,
            estado: estado,
            id_cliente: id_cliente,
            id_usuario: id_usuario
        })
    
        res.json({
            msg: `Notaventao  ${fecha} creado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}

export const UpdateNotaventa = async (req: Request, res: Response) => {
    var { id } = req.params;
    const{ fecha, monto, tipopago, estado, id_cliente, id_usuario}= req.body;
    try {
           // Buscar el Notaventao actual en la base de datos
           var existingNotaventa = await Notaventa.findOne({ where: { id } });
        
           if (!existingNotaventa) {
               return res.status(404).json({
                   msg: 'Notaventao no encontrado',
               });
           }
   
           // Actualizamos el Notaventao en la base de datos
           const [updated] = await Notaventa.update({
                fecha: fecha,
                monto: monto,
                tipopago: tipopago,
                estado: estado,
                id_cliente: id_cliente,
                id_usuario: id_usuario   

           }, { where: { id } });
   
           if (updated) {
               const updatedNotaventa = await Notaventa.findOne({ where: { id } });
               res.status(200).json({
                   msg: `Notaventao ${fecha} actualizado exitosamente!`,
                   Notaventa: updatedNotaventa
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
export const DeleteNotaventa = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Eliminar Notaventao en la base de datos
        const deleted = await Notaventa.destroy({
            where: { id }
        });
    
        if (deleted) {
            res.status(200).json({
                msg: `Notaventa con ID ${id} eliminado exitosamente!`
            });
        } else {
            res.status(404).json({
                msg: 'Notaventa no encontrado',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps, ocurrió un error',
            error
        })
    }
}