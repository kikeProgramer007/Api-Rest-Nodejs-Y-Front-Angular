import { Request, Response } from 'express';
import { Detalleventa } from '../models/detalleventa';
import { Notaventa } from '../models/notaventa'
import { Product } from '../models/product';
;


export const getDetalleventas = async (req: Request, res: Response) => {
    const listDetalleventas = await Detalleventa.findAll();//{ include: Categoria }

    res.json(listDetalleventas)
}

export const GetDetalleventa = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Actualizamos Detalleventao en la base de datos
        const SetDetalleventa = await Detalleventa.findOne({ where: { id } });
        
        if (SetDetalleventa) {
            res.status(200).json(SetDetalleventa);
        } else {
            res.status(404).json({
                msg: 'Detalleventao no encontrado',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}

export const NewDetalleventa = async (req: Request, res: Response) => {
    const{ id_venta, id_producto, cantidad, precio_v}= req.body;
    try {
        // Guardarmos Detalleventao en la base de datos
        await Detalleventa.create({
            id_venta: id_venta,
            id_producto: id_producto,
            cantidad: cantidad,
            precio_v: precio_v
        })
    
        res.json({
            msg: `Detalleventao  ${id_venta} creado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}

export const UpdateDetalleventa = async (req: Request, res: Response) => {
    var { id } = req.params;
    const{ id_venta, id_producto, cantidad, precio_v}= req.body;
    try {
           // Buscar el Detalleventao actual en la base de datos
           var existingDetalleventa = await Detalleventa.findOne({ where: { id } });
        
           if (!existingDetalleventa) {
               return res.status(404).json({
                   msg: 'Detalleventa no encontrado',
               });
           }
   
           // Actualizamos el Detalleventao en la base de datos
           const [updated] = await Detalleventa.update({
                id_venta: id_venta,
                id_producto: id_producto,
                cantidad: cantidad,
                precio_v: precio_v  

           }, { where: { id } });
   
           if (updated) {
               const updatedDetalleventa = await Detalleventa.findOne({ where: { id } });
               res.status(200).json({
                   msg: `Detalleventa ${id_venta} actualizado exitosamente!`,
                   Detalleventa: updatedDetalleventa
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
export const DeleteDetalleventa = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Eliminar Detalleventao en la base de datos
        const deleted = await Detalleventa.destroy({
            where: { id }
        });
    
        if (deleted) {
            res.status(200).json({
                msg: `Detalleventao con ID ${id} eliminado exitosamente!`
            });
        } else {
            res.status(404).json({
                msg: 'Detalleventao no encontrado',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps, ocurrió un error',
            error
        })
    }
}