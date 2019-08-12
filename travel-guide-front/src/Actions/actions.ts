import { ActionCreator } from "redux";
import { TAction } from "./actionTypes";
import { ITravel } from "../interfaces";
import {IUser} from "../interfaces";


export const setToken: ActionCreator<TAction> = (token: string) => ({
  type: "SET_TOKEN",
  token: token
});
export const setUser: ActionCreator<TAction> = (user: IUser) => ({
  type: "SET_USER",
  user: user
});
export const addTravel: ActionCreator<TAction> = (travel: ITravel) => ({
  type: "ADD_TRAVEL",
  travel: travel
});

export const setTravel: ActionCreator<TAction> = (travels: ITravel[]) => ({
  type: "SET_TRAVEL",
  travels: travels
});

