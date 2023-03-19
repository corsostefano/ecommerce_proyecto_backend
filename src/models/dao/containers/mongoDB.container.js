import { logger } from "../../../logs/logger.logs.js";
import mongoose from 'mongoose';
import config from '../../../config/mongoDB.config.js';

const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(config.mongoDB.URI, advancedOptions);

class MongoDBContainer {
    constructor(collection) {
      this.collection = collection;
    }
  
    async create(data) {
      try {
        return await this.collection.create(data);
      } catch (err) {
        logger.error('No es posible crear la base de datos ', err);
        const customError = new Error(`No es posible crear la base de datos: ${err}`);
        customError.id = 4;
        next(customError);
      }
    }
  
    async getAll() {
      try {
        return await this.collection.find({}).lean();
      } catch (err) {
        logger.error('No es posible obtener la información de la base de datos ', err);
        const customError = new Error(`No es posible obtener la información de la base de datos: ${err}`);
        customError.id = 4;
        next(customError);
      }
    }
  
    async getOneById(id) {
      try {
        return await this.collection.findById(id);
      } catch (err) {
        logger.error('No es posible obtener el elemento buscado de la base de datos ', err);
        const customError = new Error(`No es posible obtener el elemento buscado de la base de datos: ${err}`);
        customError.id = 4;
        next(customError);
      }
    }
  
    async updateById(id, data) {
      try {
        return await this.collection.updateOne({ _id: id }, { $set: data });
      } catch (err) {
        logger.error('No es posible actualizar el elemento en la base de datos ', err);
        const customError = new Error(`No es posible actualizar el elemento en la base de datos: ${err}`);
        customError.id = 4;
        next(customError);
      }
    }
  
    async deleteById(id) {
      try {
        return await this.collection.deleteOne({ _id: id });
      } catch (err) {
        logger.error('No es posible borrar el elemento de la base de datos ', err);
        const customError = new Error(`No es posible borrar el elemento de la base de datos: ${err}`);
        customError.id = 4;
        next(customError);
      }
    }
  }
  
  export default MongoDBContainer;