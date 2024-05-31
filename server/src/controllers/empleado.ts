import { Request, Response } from 'express';
import { Empleado } from '../models/empleado';

export const GetLista = async (req: Request, res: Response) => {
    const lstAll = await Empleado.findAll();
    res.json(lstAll)
}

export const Buscar = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Actualizamos cliente en la base de datos
        const oEmpleado = await Empleado.findOne({ where: { id } });
        
        if (oEmpleado) {
            res.status(200).json(oEmpleado);
        } else {
            res.status(404).json({
                msg: 'Empleado no encontrado',
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
    const{ nombre,telefono,direccion,correo }= req.body;
    try {
        // Guardarmos cliente en la base de datos
        if (nombre == null) {
            throw new Error("El nombre no puede ser nulo");
        }
        await Empleado.create({
            nombre: nombre,
            telefono: telefono,
            direccion: direccion,
            correo: correo,
        })
    
        res.json({
            msg: `Empleado  ${nombre} creado exitosamente!`
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
    var{ nombre,telefono,direccion,correo }= req.body;
    try {
           // Buscar el cliente actual en la base de datos
           var oEmpleado = await Empleado.findOne({ where: { id } });
        
           if (!oEmpleado) {
               return res.status(404).json({
                   msg: 'Empleado no encontrado',
               });
           }
   
           // Actualizamos el cliente en la base de datos
           const [updated] = await Empleado.update({
               nombre: nombre,
               telefono: telefono,
               direccion: direccion,
               correo: correo,
           }, { where: { id } });
   
           if (updated) {
               const empleado = await Empleado.findOne({ where: { id } });
               res.status(200).json({
                   msg: `Empleado ${nombre} actualizado exitosamente!`,
                   product: empleado
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
        const deleted = await Empleado.destroy({
            where: { id }
        });
    
        if (deleted) {
            res.status(200).json({
                msg: `Empleado con ID ${id} eliminado exitosamente!`
            });
        } else {
            res.status(404).json({
                msg: 'Empleado no encontrado',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps, ocurrió un error',
            error
        })
    }
}