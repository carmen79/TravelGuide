export interface ITravel {
 
    _id: string;
    destino: string;
    fechaInicio: Date;
    fechaFin: Date;
    descripcion: string;
    userId: string;
  }

  export interface IUser {
    _id?: string;
    username?: string;
    password?: string;
    admin?: false;
    email?: string;
    avatar?: string;
    description?:string;
    time?: number;
  }
  
  