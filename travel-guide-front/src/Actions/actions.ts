import { ActionCreator } from "redux";
import { TAction } from "./actionTypes";
import { ITravel } from "../interfaces";


export const setToken: ActionCreator<TAction> = (token: string) => ({
  type: "SET_TOKEN",
  token: token
});
export const addTravel: ActionCreator<TAction> = (travel: ITravel) => ({
  type: "ADD_TRAVEL",
  travel: travel
});

