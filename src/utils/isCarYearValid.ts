import { AppError } from "../errors/AppError";

export function isCarYearValid(year: string): void{

  let yearDate: Date | number = new Date(year)
  yearDate = yearDate.getFullYear();

  if (!(1950 <= yearDate && yearDate <= 2023)){
    throw new AppError("Year date must be between 1950 and 2023", 400);
  }
  return;
}