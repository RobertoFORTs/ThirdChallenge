

export class QueryFeatures{

  static filter(queryInfo: object) {
    const queryObj = { ...queryInfo };

    let queryStr = JSON.stringify(queryObj);
    const regex = /\b(gt|gte|lt|lte|in)\b/g; 
    queryStr = queryStr.replace(regex, '$$' + "$1")
  
    return queryStr;
  }
}