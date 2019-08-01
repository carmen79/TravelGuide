


type TSetTokenAction = {
  type: "SET_TOKEN";
  token: string;
};


export type TAction =
  | TSetTokenAction
 