import { Timestamp } from "firebase/firestore";

export class Citas {
    idPaciente: string=""
    idMedico: string=""
    nombreDoctor: string="";
    nombrePaciente: string="";
    fecha?: Timestamp;
    atendida?:boolean
    cancelado?:boolean;   
    fotoPaciente:string=''
}
