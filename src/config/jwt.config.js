import jwt from "jsonwebtoken";
import User from "../models/schema/user.model.js";

export async function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    const customError = new Error('Falta el token de autenticación');
    customError.id = 2;
    next(customError);
  }
  try {
    const decodedToken = jwt.verify(token, 'my-secret-key');
    const user = await User.findById(decodedToken.id);
    if (!user) {
      const customError = new Error('Usuario no encontrado');
      customError.id = 2;
      next(customError);
    }
    req.user = user;
    next();
  } catch (error) {
    const customError = new Error('Token de autenticación inválido');
    customError.id = 2;
    next(customError);
  }
}
