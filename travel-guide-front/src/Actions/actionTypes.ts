import { ITravel } from "../interfaces";
import { IUser } from "../interfaces";



type TSetTokenAction = {
  type: "SET_TOKEN";
  token: string;
};

type TSetUserAction = {
  type: "SET_USER";
  user: IUser;
};
type TAddTravelAction = {
  type: "ADD_TRAVEL";
  travel: ITravel;
};

type TSetTravelAction = {
  type: "SET_TRAVEL";
  travels: ITravel[];
};

export type TAction =
  | TSetTokenAction
  | TSetUserAction
  | TAddTravelAction 
  | TSetTravelAction