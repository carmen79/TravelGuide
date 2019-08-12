
import { tokenReducer } from "./tokenReducer";
import { combineReducers } from 'redux';
import { ITravel, IUser } from '../interfaces';
import { travelReducer } from './travelsReducer';
import { userReducer } from './userReducer';



export interface IGlobalState {
  token: string;
  user: IUser;
  travels: ITravel[];

 
}
export const reducers = combineReducers({

  token: tokenReducer,
  user: userReducer,
  travel:travelReducer


});
