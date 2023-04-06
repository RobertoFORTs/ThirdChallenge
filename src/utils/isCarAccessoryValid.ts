import { AppError } from "../errors/AppError";

export function isCarAccessoryValid(accessories: object[]): void {
  let i = 0;
  for (i ; i < accessories.length; i++){  
    let newArray = [];
    newArray = accessories.filter((el) => Object.values(el)[0].tolowercase() === Object.values(accessories[i])[0].tolowercase() );
    if (newArray.length > 1){
      throw new AppError("Duplicate acessory is not allowed", 400);
    }
  }
  return;
}