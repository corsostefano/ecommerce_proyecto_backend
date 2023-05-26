import { logger } from '../logs/logger.logs.js';
import {schema} from '../middleware/joi.middleware.js'
import mongoose from 'mongoose';
import { sendMail } from '../utils/email.utils.js';
import {
  getUser,
  addNewUser,
  getUsers,
  uploadUser,
  deleteUser,
  getUsersInactiveForTwoDays
} from '../services/user.services.js';


export async function getAuthUser(req, res, next) {
  try {
    const user = await getUser(req.user.id);

    await uploadUser(user._id, { lastLogin: new Date() });
    

    res.json(user);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function registerUser(req, res, next) {
  try {
    const { body } = req;
    const { error } = schema.validate(body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const user = await addNewUser({...body, type: body.type});
    res.json(user);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function getAllUsers(_, res, next) {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function getOneUser(req, res, next) {
  try {
    const { params: { id } } = req
    const user = await getUser(id)
    if (!user) {
      return res.status(404).end()
    }
    res.json(user)
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function updateUser(req, res, next) {
  try {
    const { params: { id }, body } = req;
    const { modifiedCount, matchedCount } = await uploadUser(id, body); 
    if (!modifiedCount || !matchedCount) {
      return res.status(404).end();
    }
    res.status(204).end();
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function deleteOneUser(req, res, next) {
  try {
    const { params: { id } } = req;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }
    const deletedCount = await deleteUser(id); 
    if (deletedCount === 0) {
      return res.status(404).end();
    }
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function deleteInactiveUsers(_, res, next) {
  try {
    const inactiveUsers = await getUsersInactiveForTwoDays();
    await Promise.all(
      inactiveUsers.map(async (user) => {
        const emailData = {
          to: user.email, 
          subject: 'Eliminación de cuenta por inactividad',
          text: 'Tu cuenta ha sido eliminada debido a inactividad.',
        };

        await sendMail(emailData.subject, emailData.text, emailData.to); 
      })
    );
    const deletedUserCount = await Promise.all(
      inactiveUsers.map((user) => deleteUser(user._id))
    );
    const totalDeletedUsers = deletedUserCount.reduce((acc, curr) => acc + curr, 0);
    res
      .status(200)
      .json({ message: 'Usuarios inactivos eliminados', totalDeletedUsers });
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}
