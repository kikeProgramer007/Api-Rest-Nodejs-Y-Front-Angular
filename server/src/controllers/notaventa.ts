import { Request, Response } from 'express';
import { Notaventa } from '../models/notaventa';
import { Cliente } from '../models/cliente';
import { User } from '../models/user';
import sequelize from '../db/connection';
import { appService } from '../servicios/app.service';

export const getNotaventas = async (req: Request, res: Response) => {
    const listNotaventas = await Notaventa.findAll({
        include: [
            { model: Cliente },
            { model: User }
        ],
        order: [['fecha', 'DESC'],['id', 'DESC']]
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
        const createdNotaventa  =  await Notaventa.create({
            fecha: fecha,
            monto: monto,
            tipopago:tipopago,
            estado: estado,
            id_cliente: id_cliente,
            id_usuario: id_usuario
        })
        if (createdNotaventa) {
            res.json({
                msg: `Nota de venta para la fecha ${fecha} creada exitosamente!`,
                Notaventa: createdNotaventa
            });
        }else {
            res.status(500).json({
                msg: 'Error al crear la nota de venta'
            });
        }
      
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
                id_usuario:id_usuario
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



//listar Registros
export const GetRptRangoVentas = async (req: Request, res: Response) => {
    const{ usuario, fecha_inicio, fecha_fin}= req.body;
    try{
        
        const resultados: any = await sequelize.query(`
            SELECT DATE(nv.fecha) as fechaventa,TIME(nv.fecha) hora,u.username,c.nombre,nv.monto
            FROM notaventa nv
            JOIN clientes c ON (nv.id_cliente=c.id)
            JOIN users u ON (nv.id_usuario=u.id)
            WHERE DATE(nv.fecha) BETWEEN DATE('${fecha_inicio}') AND DATE('${fecha_fin}') 
            ORDER BY nv.fecha ASC
          `);

       if (resultados[0].length > 0) {
        var buffer = await appService.pdfRangoFechas(resultados[0],usuario);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=example.pdf',
            'Content-Length': buffer.length,
          })
        res.status(200).send(buffer);
        } else {
            res.status(404).json({
                msg: 'error',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}
