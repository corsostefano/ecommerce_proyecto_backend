import moment from "moment";
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
  data.lastLogin = new Date();
  await userInstance.updateById(id, data);
}


async function deleteUser(id) {
  const result = await userInstance.deleteById(id);
  return result ? 1 : 0;
}

async function getUsersInactiveForTwoDays() {
  const twoDaysAgo = moment().subtract(2, 'days');
  const inactiveUsers = await userInstance.findInactiveUsersSince(twoDaysAgo);
  return inactiveUsers;
}


export { getUser, addNewUser, getUsers, uploadUser, deleteUser, getUsersInactiveForTwoDays };
