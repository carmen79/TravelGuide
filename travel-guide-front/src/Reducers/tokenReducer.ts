import { TAction } from "../Actions/actionTypes";

// en el reducer tenemos valor inicial y action
//el valor inicial lo podemos inicar desde aquí, en este caso
//el valor inicial del token es ""??
//¿Cual es la acción?

export const tokenReducer = (state: string = "", action: TAction): string => {
  if (action.type === "SET_TOKEN") {
    return action.token;
  }
  return state;
};
