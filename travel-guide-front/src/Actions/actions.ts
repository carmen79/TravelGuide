import { ActionCreator } from "redux";
import { TAction } from "./actionTypes";


export const setToken: ActionCreator<TAction> = (token: string) => ({
  type: "SET_TOKEN",
  token: token
});

