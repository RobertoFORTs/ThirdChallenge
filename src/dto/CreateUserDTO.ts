export interface CreateUserDTO {
  name: string,
  cpf: string,
  birth: Date,
  email: string,
  password: string,
  cep: string,
  qualified: boolean,
}