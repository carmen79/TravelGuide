import { ITravel } from "../interfaces";



type TSetTokenAction = {
  type: "SET_TOKEN";
  token: string;
};

type TAddTravelAction = {
  type: "ADD_TRAVEL";
  travel: ITravel;
};

export type TAction =
  | TSetTokenAction
  | TAddTravelAction
 