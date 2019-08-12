import { TAction } from '../Actions/actionTypes';
import { IUser } from '../interfaces'


const initialState: IUser = {};

export const userReducer = (state: IUser = initialState, action: TAction): IUser => {
  if (action.type === "SET_USER") {
    return action.user;
  }
  return state;
};



