export function isValidCep(cep: string){
  if (isNaN(parseInt(cep))){
    return false;
  }
  const cepS = cep.split("");
  if (cepS.length !== 8){
    return false;
  }
  return true;
}