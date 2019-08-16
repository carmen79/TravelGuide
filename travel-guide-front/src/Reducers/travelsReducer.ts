import { TAction } from '../Actions/actionTypes';
import { ITravel } from '../interfaces'


// en el reducer tenemos valor inicial y action
//el valor inicial lo podemos inicar desde aquí, en este caso
//el valor inicial del token es ""??
//¿Cual es la acción?

const initialState: ITravel[] = [];

export const travelReducer = (
  state: ITravel[] = initialState,
  action: TAction
): ITravel[] => {

  if (action.type === "ADD_TRAVEL") {
    state.push(action.travel)
    return [...state];
  }
  if (action.type === "SET_TRAVEL") {
    return action.travels
  }
  if (action.type === "REMOVE_TRAVEL") {
    const index = state.findIndex(t => t._id === action.travel_id);
    state.splice(index, 1);
    return [...state];
  }

  return state
}



