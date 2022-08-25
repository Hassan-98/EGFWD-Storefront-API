import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env

const generateToken = (id: number): string => {
  return jwt.sign(id.toString(), JWT_SECRET as string);
};

export default generateToken;
