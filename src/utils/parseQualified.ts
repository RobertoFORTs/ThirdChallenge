export function parseQualified( qualified: string ){
  if (qualified.toLowerCase() === "yes"){
    return true;
  }
  return false;
}