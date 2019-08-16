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

type TSetTravelsAction = {
  type: "SET_TRAVEL";
  travels: ITravel[];
};
type TRemoveTravelAction = {
  type: "REMOVE_TRAVEL";
  travel_id: string;
};

export type TAction =
  | TSetTokenAction
  | TSetUserAction
  | TAddTravelAction
  | TSetTravelsAction
  | TRemoveTravelAction