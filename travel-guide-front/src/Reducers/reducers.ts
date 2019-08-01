
import { tokenReducer } from "./tokenReducer";
import { combineReducers } from 'redux';



export interface IGlobalState {
  token: string;
 
}
export const reducers = combineReducers({

  token: tokenReducer,



});
