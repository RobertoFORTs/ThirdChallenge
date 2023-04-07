import { Model } from "mongoose";


export class QueryFeatures{

  static filter(queryInfo: object): string {
    const queryObj = { ...queryInfo };

    let queryStr = JSON.stringify(queryObj);
    const regex = /\b(gt|gte|lt|lte|in)\b/g; 
    queryStr = queryStr.replace(regex, '$$' + "$1");
    
    return queryStr;
  }

  static paginate(queryInfo: any): number[] {
    const page = queryInfo.page * 1 || 1;
    const limit = queryInfo.limit * 1 || 100;
    const skip = (page - 1) * limit;
    const array = [skip, limit];
    return array;
  }
}