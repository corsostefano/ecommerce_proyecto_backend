import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        const customError = new Error('Falta el token de autenticación');
        customError.id = 2;
        next(customError);
    }

    try {
        const decodedToken = jwt.verify(token, 'my-secret-key');
        req.user = decodedToken;
        next();
    } catch (error) {
        const customError = new Error('Token de autenticación inválido');
        customError.id = 2;
        next(customError);
    }
}