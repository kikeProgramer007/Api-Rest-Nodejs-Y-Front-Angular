import { Request, Response } from 'express';
import { Categoria } from '../models/categoria';

export const GetLista = async (req: Request, res: Response) => {
    const listProducts = await Categoria.findAll();

    res.json(listProducts)
}

export const Buscar = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Actualizamos producto en la base de datos
        const oCategoria = await Categoria.findOne({ where: { id } });
        
        if (oCategoria) {
            res.status(200).json(oCategoria);
        } else {
            res.status(404).json({
                msg: 'Categoria no encontrado',
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
    const{ nombre }= req.body;
    try {
        // Guardarmos producto en la base de datos
        if (nombre == null) {
            throw new Error("El nombre no puede ser nulo");
        }
        await Categoria.create({
            nombre: nombre,
        })
    
        res.json({
            msg: `Categoria  ${nombre} creado exitosamente!`
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
    var{ nombre, }= req.body;

    try {
           // Buscar el producto actual en la base de datos
           var oCategoria = await Categoria.findOne({ where: { id } });
        
           if (!oCategoria) {
               return res.status(404).json({
                   msg: 'Categoria no encontrado',
               });
           }
   
           // Actualizamos el producto en la base de datos
           const [updated] = await Categoria.update({
               nombre: nombre,
           }, { where: { id } });
   
           if (updated) {
               const categoria = await Categoria.findOne({ where: { id } });
               res.status(200).json({
                   msg: `Categoria ${nombre} actualizado exitosamente!`,
                   product: categoria
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
        // Eliminar producto en la base de datos
        const deleted = await Categoria.destroy({
            where: { id }
        });
    
        if (deleted) {
            res.status(200).json({
                msg: `Categoria con ID ${id} eliminado exitosamente!`
            });
        } else {
            res.status(404).json({
                msg: 'Categoria no encontrado',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps, ocurrió un error',
            error
        })
    }
}