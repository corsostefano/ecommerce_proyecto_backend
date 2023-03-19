import MongoDBContainer from './containers/mongoDB.container.js';
import userModel from '../schema/user.model.js';

let userInstance = null;

export default class UserDAO extends MongoDBContainer {
    constructor(model) {
        super(model);
    }

    static getInstance() {
        if (!userInstance) {
            userInstance = new UserDAO(userModel);
        }
        return userInstance
    }
}