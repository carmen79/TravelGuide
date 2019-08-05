
import { tokenReducer } from "./tokenReducer";
import { combineReducers } from 'redux';
import { ITravel } from '../interfaces';
import { travelReducer } from './travelsReducer';



export interface IGlobalState {
  token: string;
  travels: ITravel[];
 
}
export const reducers = combineReducers({

  token: tokenReducer,
  travel:travelReducer


});
