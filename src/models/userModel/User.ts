import { IUser } from "./IUser";
import { Schema, model } from "mongoose"
import bcrypt from "bcrypt";
import { number } from "joi";

const userSchema = new Schema<IUser>({
  name: {
    type: String
  },
  cpf: {
    type: String,
    unique: true
  },
  birth: {
    type: Date
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  cep: {
    type: Number
  },
  qualified: {
    type: Boolean
  },
  patio: {
    type: String
  },
  complement: {
    type: String
  },
  neighborhood: {
    type: String
  },
  locality: {
    type: String
  },
  uf: {
    type: String
  }
});

userSchema.pre("save", async function (next):Promise<void> {
	if (this.isModified("password")){
		this.password = await bcrypt.hash(this.password, 12);
		next();
	}
	return next();
})

const User = model<IUser>("user", userSchema);

export { User }; 