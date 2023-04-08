import { logger } from "../logs/logger.logs.js";
import { sendMail } from '../utils/email.utils.js';
import jwt from 'jsonwebtoken';
import User from '../models/schema/user.model.js'

export async function getCookie(req, res, next) {
  try {
    const cookies = req.cookies.token
    if (cookies) {
      res.status(200).json({ cookies });
    } else {
      res.status(401).json('no existe cookie');
    }
  } catch (err) {
    logger.error(`${err.message}`);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function signIn(req, res, next) {
  try {
    const { user } = req
    if (!user) {
      return res.status(401).json({ message: 'El usuario o la contraseña son incorrectos.' });
    }
    req.login(user, { session: false }, async (err) => {
      if (err) return next(err)
      const token = jwt.sign({ email: user.email, id: user._id }, 'my-secret-key', { expiresIn: '1h' }); // aumentamos la duración del token a una hora
      return res.cookie('token', token, { maxAge: 3600000, httpOnly: true }).json({ message: `Bienvenido ${user.email}.`, token })
    })
  }
  catch (err) {
    logger.error(`No ha sido posible loguearse: ${err.message}`);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}



export async function signOut(_, res, next) {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: `Hasta luego!.` });
  } catch (err) {
    logger.error(`No ha sido posible desloguearse de la cuenta: ${err.message}`);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function signUp(req, res) {
  try {
    const { user } = req;
    const timestamp = new Date();
    const bodyHTML = `Se registró un nuevo usuario con los siguientes datos:
        <ul>
        <li>Usuario: ${user.email}</li>
        <li>Nombre completo: ${user.fullname}</li>
        <li>Teléfono: ${user.phone}</li>
        <li>Fecha y Hora de registro: ${timestamp.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}</li>
        </ul>`;
    const messageUserHTML = `“Te damos la bienvenida” tus datos de registro son los siguientes: 
        <ul>
        <li>Usuario: ${user.email}</li>
        <li>Nombre completo: ${user.fullname}</li>
        <li>Teléfono: ${user.phone}</li>
        <li>Fecha y Hora de registro: ${timestamp.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}</li>
        </ul>`;    
    await sendMail(`Usuario ${user.email} se registró.`, bodyHTML, process.env.USER_GMAIL);
    await sendMail('Tu Usuario se ha creado satisfactoriamente.',messageUserHTML, user.email)

    res.json({ message: `Usuario ${user.email} se registró.`, user });
  } catch (err) {
    logger.error(`No es posible registrarse: ${err.message}`);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function forgotPassword(req, res, next){
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const token = jwt.sign({ userId: user._id }, 'my-secret-key', { expiresIn: '1h' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hora
    await user.save();

    const resetPasswordUrl = `http://localhost:8080/auth/forgot-password/resetPassword?token=${token}`;
    const emailBody = `Hola ${user.name},\n\nHas solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:\n\n${resetPasswordUrl}\n\nSi no has solicitado esta acción, simplemente ignora este mensaje.\n\nSaludos,\nEquipo de soporte`;
    await sendMail('Recuperación de contraseña', emailBody, user.email);

    res.status(200).json({ message: "Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña" });
  } catch (err) {
    next(err)
  }
}
export async function resetPassword(req, res, next){
  try {
    const { token, password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ message: "El token es inválido o ha expirado" });
    }

    user.setPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "La contraseña se ha actualizado correctamente" });
  } catch (err) {
    next(err);
  }
}
 








/*
export async function forgotPassword(req, res, next){
  try {
    const { email } = req.body;
    const user = await  User.findOne({email});
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const token = jwt.sign({ userId: user._id }, 'my-secret-key', { expiresIn: '1m' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 60 * 1000; // 1 minuto
    await user.save();

    const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}`;
    const emailBody = `Hola ${user.name},\n\nHas solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:\n\n${resetPasswordUrl}\n\nSi no has solicitado esta acción, simplemente ignora este mensaje.\n\nSaludos,\nEquipo de soporte`;
    await sendMail('Recuperación de contraseña', emailBody, user.email); // La función sendMail se llama con los parámetros correctos

    res.status(200).json({ message: "Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña" });
  } catch (err) {
    next(err)
  }
}
*/