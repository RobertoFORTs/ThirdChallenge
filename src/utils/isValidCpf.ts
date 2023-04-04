/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
function validadeDigits(cpf: string){
  
  cpf = cpf.replace(/\.|-/g, "");

  let numbers = cpf.split("");

  if (numbers.length !== 11){
    return false;
  }

  const firstDigit: number = +numbers[9];
  const secondDigit: number = +numbers[10];
  let sum: number = 0;

  for (let i = 0; i < 9; i++){
    let num: number = +numbers[i];
    sum += num * (10-i);
  }

  let rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11){
    rest = 0;
  }
  if (rest !== firstDigit){
    return false;
  }

  sum = 0;

  for (let i=0; i<10; i++){
    let num: number = +numbers[i];
    sum += num * (11 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11){
    rest = 0;
  }

  if (rest !== secondDigit){
    return false;
  }

  return true;
}

export function isValidCpf(cpf : string){
  return validadeDigits(cpf);
}