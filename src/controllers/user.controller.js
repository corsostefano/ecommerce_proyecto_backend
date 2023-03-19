import { logger } from '../logs/logger.logs.js';
import {
  getUser,
  addNewUser,
  getUsers,
  uploadUser,
  deleteUser
} from '../services/user.services.js';

export async function getAuthUser(req, res, next) {
  try {
    const user = await getUser(req.user.id);
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
    const user = await addNewUser(body);
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
    const { params: { id }, body } = req
    const { modifiedCount, matchedCount } = uploadUser(id, body)
    if (!modifiedCount || !matchedCount) {
      return res.status(404).end()
    }
    res.status(204).end()
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

export async function deleteOneUser(req, res, next) {
  try {
    const { params: { id } } = req
    const { deletedCount } = deleteUser(id)
    if (!deletedCount) {
      return res.status(404).end()
    }
    res.status(204).end()
  } catch (err) {
    logger.error(err.message);
    const customError = new Error(err.message);
    customError.id = 3;
    next(customError);
  }
}

