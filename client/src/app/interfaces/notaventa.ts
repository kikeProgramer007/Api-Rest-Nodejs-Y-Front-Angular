import { Cliente } from "./cliente";
import { User } from "./user";

export interface Notaventa {
    id?: number,
    fecha: Date,
    monto: number,
    tipopago:string,
    estado: boolean,
    id_cliente: number,
    id_usuario: number,
    cliente?: Cliente,
    user?: User,
}