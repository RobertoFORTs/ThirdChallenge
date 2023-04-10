export function isQualifiedValid(qualified: string){
  if (qualified.toLowerCase() === "yes" || qualified.toLowerCase() === "no"){
    return true;
  }
  return false;
}