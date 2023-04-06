import { AppError } from "../errors/AppError";

export function isCarYearValid(year: string): void{

  if (year.split("").length < 4){
    throw new AppError("Please put a valid year", 400);
  }

  let yearDate: Date | number = new Date(year)
  yearDate = yearDate.getFullYear();

  if (!(1950 <= yearDate && yearDate <= 2023)){
    throw new AppError("Year date must be between 1950 and 2023", 400);
  }
  return;
}