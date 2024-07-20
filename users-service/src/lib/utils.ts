import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUNDS;

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string) => {
  return bcrypt.compareSync(plain, hashed);
};
