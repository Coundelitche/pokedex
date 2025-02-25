import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET is required");
}

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: "24h" });
};
