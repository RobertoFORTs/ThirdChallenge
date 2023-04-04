export function isQualifiedValid(qualified: string){
  if (qualified.toLowerCase() === "sim" || qualified.toLowerCase() === "não"){
    return true;
  }
  return false;
}