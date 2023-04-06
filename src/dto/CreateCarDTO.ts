
export interface ICreateCarDTO{
  model: string,
  color: string,
  year: Date,
  value_per_day: number,
  accessories: object[],
  number_of_passengers: number
}