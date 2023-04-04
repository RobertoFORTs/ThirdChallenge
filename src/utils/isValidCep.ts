export function isValidCep(cep: number){
  const cepS = cep.toString().split("");
  if (cepS.length !== 8){
    return false;
  }
  return true;
}