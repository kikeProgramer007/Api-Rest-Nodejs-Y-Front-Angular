import { Request, Response } from 'express';
import { Detalleventa } from '../models/detalleventa';
import { Notaventa } from '../models/notaventa'
import { Product } from '../models/product';
import { appService } from '../servicios/app.service';
import { Cliente } from '../models/cliente';
import { User } from '../models/user';


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
    const{ id_venta, id_producto, cantidad, precio_v, subtotal}= req.body;
    try {
        // Guardarmos Detalleventao en la base de datos
        await Detalleventa.create({
            id_venta: id_venta,
            id_producto: id_producto,
            cantidad: cantidad,
            precio_v: precio_v,
            subtotal: subtotal
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
    const{ id_venta, id_producto, cantidad, precio_v,subtotal}= req.body;
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
                precio_v: precio_v,
                subtotal: subtotal,

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

export var PDFDetalleVenta = async (req: Request, res: Response):Promise<void> => {
    var { id } = req.params;
    try {
       // Obtener los detalles de la venta desde la base de datos
       const detalles = await Detalleventa.findAll({where: { id_venta: id }});

    if (detalles.length > 0) {
        // Crear una lista para almacenar los detalles combinados
        const detallesCombinados: any[] = [];
        const venta = await Notaventa.findOne({  include: [
            { model: Cliente },
            { model: User }
        ], where: { id: id } });
        // Recorrer cada elemento de detalles y agregarlo a detallesCombinados
        for (const detalle of detalles) {
            const producto = await Product.findOne({ where: { id: detalle.getDataValue('id_producto') } });

            if (producto) {
                const item: any = {
                    // id: detalle.getDataValue('id'),
                    id_venta: detalle.getDataValue('id_venta'),
                    // id_producto: detalle.getDataValue('id_producto'),
                    nombre: producto.getDataValue('name'), // Obtener el nombre del producto
                    descripcion: producto.getDataValue('description'), // Obtener el nombre del producto
                    precio_v: detalle.getDataValue('precio_v'), // Acceder al valor de precio_v
                    cantidad: detalle.getDataValue('cantidad'),
                    subtotal: detalle.getDataValue('subtotal'), // Acceder al valor de subtotal
                };
                detallesCombinados.push(item);
            }
        }

        // res.json(detallesCombinados)

         //Simular la generación del PDF (reemplaza con tu lógica real)
         //const buffer = Buffer.from(JSON.stringify(detallesCombinados)); // Ejemplo: convierte a JSO
     
         if (detallesCombinados) {
            var buffer = await appService.generatePDF(detallesCombinados,venta);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=example.pdf',
                'Content-Length': buffer.length,
              })
              res.send(buffer);
        }
    } else {
        res.status(404).json({
            msg: 'Detalleventa no encontrado',
        });
    }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}
