import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "../models/schema/user.model.js";
import { 
    isValidPassword, 
    encryptPassword 
} from "../utils/password.utils.js";
import { logger } from "../logs/logger.logs.js";

function initAdminPassport() {
    passport.use('admin-sign-in', new LocalStrategy({
      usernameField: 'email',
    }, (email, password, done) => {
      UserModel.findOne({ email })
        .then((user) => {
          if (!user) {
            logger.warn(`Fallo en el login: usuario no encontrado con el correo ${email}`);
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            logger.warn(`Contraseña inválida para el usuario administrador ${email}`);
            return done(null, false);
          }
          if (!user.isAdmin) {
            logger.warn(`El usuario con correo ${email} no tiene permisos de administrador`);
            return done(null, false);
          }
          logger.info(`El usuario administrador ${email} ha iniciado sesión`);
          return done(null, user);
        })
        .catch(err => {
          logger.error(`No ha sido posible iniciar sesión del usuario administrador:
            ${err.message}`);
          done(err);
        });
    }));
  
    passport.use('admin-sign-up', new LocalStrategy({
      usernameField: 'email',
      passReqToCallback: true,
    }, (req, email, password, done) => {
      UserModel.findOne({ email })
        .then(user => {
          if (user) {
            logger.warn(`Fallo en el registro: el usuario con el correo ${email} ya existe`);
            return done(null, false);
          }
          const newUser = {
            ...req.body,
            password: encryptPassword(password),
            isAdmin: true
          };
          UserModel.create(newUser);
          logger.info(`Usuario administrador con el correo ${newUser.email} registrado exitosamente`);
          return done(null, newUser);
        })
        .catch(err => {
          logger.error(`No ha sido posible registrar el usuario administrador:
            ${err.message}`);
          done(err);
        });
    }));
  }
  
  export { initAdminPassport };