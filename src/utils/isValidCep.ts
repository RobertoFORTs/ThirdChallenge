export function isValidCep(cep: string){
  const cepS = cep.split("");
  if (cepS.length !== 8){
    return false;
  }
  return true;
}