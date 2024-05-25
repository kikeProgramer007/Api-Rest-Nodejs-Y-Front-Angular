import { Request, Response } from 'express';
import { Product } from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Product.findAll();

    res.json(listProducts)
}

export const GetProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Actualizamos producto en la base de datos
        const SetProduct = await Product.findOne({ where: { id } });
        
        if (SetProduct) {
            res.status(200).json(SetProduct);
        } else {
            res.status(404).json({
                msg: 'Producto no encontrado',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}

export const NewProduct = async (req: Request, res: Response) => {
    const{ name, description }= req.body;
    try {
        // Guardarmos producto en la base de datos
        await Product.create({
            name: name,
            description: description
        })
    
        res.json({
            msg: `Producto  ${name} creado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
}

export const UpdateProduct = async (req: Request, res: Response) => {
    var { id } = req.params;
    var{ name, description}= req.body;

    try {
           // Buscar el producto actual en la base de datos
           var existingProduct = await Product.findOne({ where: { id } });
        
           if (!existingProduct) {
               return res.status(404).json({
                   msg: 'Producto no encontrado',
               });
           }
   
           // Actualizamos el producto en la base de datos
           const [updated] = await Product.update({
               name: name,
               description: description
           }, { where: { id } });
   
           if (updated) {
               const updatedProduct = await Product.findOne({ where: { id } });
               res.status(200).json({
                   msg: `Producto ${name} actualizado exitosamente!`,
                   product: updatedProduct
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
export const DeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Eliminar producto en la base de datos
        const deleted = await Product.destroy({
            where: { id }
        });
    
        if (deleted) {
            res.status(200).json({
                msg: `Producto con ID ${id} eliminado exitosamente!`
            });
        } else {
            res.status(404).json({
                msg: 'Producto no encontrado',
            });
        }

    } catch (error) {
        res.status(400).json({
            msg: 'Upps, ocurrió un error',
            error
        })
    }
}