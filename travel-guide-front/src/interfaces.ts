export interface ITravel {

  _id: string;
  destino: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
  userId: string;
  public: boolean;
  lat: number;
  lng: number;
  category: string;
  photo: string;
  summary: string;
}

export interface IUser {
  _id?: string;
  username?: string;
  password?: string;
  admin?: false;
  email?: string;
  avatar?: string;
  description?: string;
  time?: number;
}

export interface ICheckpoint {
  _id: string;
  description: string;
  title: string;
  lat: number;
  lng: number;
  photo: string;
}
