import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../models/schema/user.model.js';
import { isValidPassword, encryptPassword } from '../utils/password.utils.js'
import { logger } from "../logs/logger.logs.js";

function initPassport() {
    passport.use('sign-in', new LocalStrategy({
        usernameField: 'email',
    }, (email, password, done) => {
        UserModel.findOne({ email })
            .then((user) => {
                if (!user) {
                    logger.warn(`Fallo en el login: usuario no encontrado con el username ${email}`);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    logger.warn(`Contraseña inválida`);
                    return done(null, false);
                }
                logger.info(`${email} Acaba de iniciar sección`);
                return done(null, user);
            })
            .catch(err => {
                logger.error(`No ha sido posible iniciar sección:
                ${err.message}`);
                done(err)
            })
    }))

    passport.use('sign-up', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    }, (req, email, password, done) => {
        UserModel.findOne({ email })
            .then(user => {
                if (user) {
                    logger.warn(`Fallo en el registro: el usuario con el username ${email} ya existe`);
                    return done(null, false);
                }
                const newUser = {
                    ...req.body,
                    password: encryptPassword(password)
                }
                UserModel.create(newUser)
                logger.info(`Usuario con el username ${newUser.email} registrado exitosamente`);
                return done(null, newUser);
            })
            .catch(err => {
                logger.error(`No ha sido posible registrar el usuario:
                ${err.message}`);
                done(err);
            })
    }))
}

export { initPassport };