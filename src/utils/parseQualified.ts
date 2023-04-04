export function parseQualified( qualified: string ){
  if (qualified.toLowerCase() === "sim"){
    return true;
  }
  return false;
}