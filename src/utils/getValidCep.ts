import axios from "axios";
import { AppError } from "../errors/AppError";

export async function getValidCep(cep: string): Promise<object>{
  
  const info = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    
  if (info.data.erro === true){
    throw new AppError("Cep is invalid or does not exist!", 400);
  }

  const objInfo = { 
    patio: info.data.logradouro, 
    complement: info.data.complemento, 
    neighborhood: info.data.bairro, 
    locality: info.data.localidade, 
    uf: info.data.uf 
  };

  return objInfo;
}