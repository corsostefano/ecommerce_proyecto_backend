import { userInstance } from "../models/dao/index.dao.js";

async function getUser(id) {
  return await userInstance.getOneById(id);
}

async function addNewUser(user) {
  await userInstance.create(user);
}

async function getUsers() {
  return await userInstance.getAll();
}

async function uploadUser(id, data) {
  await userInstance.updateById(id, data);
}

async function deleteUser(id) {
  await userInstance.deleteById(id);
}

export {
  getUser,
  addNewUser,
  getUsers,
  uploadUser,
  deleteUser
};
