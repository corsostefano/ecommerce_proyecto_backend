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
        throw new Error(`No es posible crear la base de datos: ${err}`);
      }
    }
  
    async getAll() {
      try {
        return await this.collection.find({ deleted: false }).exec();
      } catch (err) {
        logger.error('No es posible obtener la información de la base de datos ', err);
        throw new Error(`No es posible obtener la información de la base de datos: ${err}`);
      }
    }

    async getByUser(userId) {
      try {
        return await this.collection.find({ createdBy: userId, deleted: false }).exec();
      } catch (err) {
        logger.error('No es posible obtener la información de la base de datos ', err);
        throw new Error(`No es posible obtener la información de la base de datos: ${err}`);
      }
    }
    
  
    async getOneById(id) {
      try {
        return await this.collection.findById(id);
      } catch (err) {
        logger.error('No es posible obtener el elemento buscado de la base de datos ', err);
        throw new Error(`No es posible obtener el elemento buscado de la base de datos: ${err}`);
      }
    }
  
    async updateById(id, data) {
      try {
        return await this.collection.updateOne({ _id: id }, { $set: data });
      } catch (err) {
        logger.error('No es posible actualizar el elemento en la base de datos ', err);
        throw new Error(`No es posible actualizar el elemento en la base de datos: ${err}`);
      }
    }
  
    async deleteById(id) {
      try {
        const result = await this.collection.delete({ _id: id });
        return result;
      } catch (err) {
        logger.error('No es posible borrar el elemento de la base de datos ', err);
        throw new Error(`No es posible borrar el elemento de la base de datos: ${err}`);
      }
    }
    
    async search(query) {
      try {
        const products = await this.collection.find({
          title: new RegExp(query, "i")
        });
        return products;
      } catch (err) {
        logger.error('No es posible buscar elementos en la base de datos ', err);
        throw new Error(`No es posible buscar elementos en la base de datos: ${err}`);
      }
    }
    async findInactiveUsersSince(date) {
      try {
        return await this.collection
          .find({
            deleted: false,
            isAdmin: false,
            lastLogin: { $lte: date }
          })
          .select('_id email')
          .exec();
      } catch (err) {
        logger.error('No es posible buscar usuarios inactivos en la base de datos', err);
        throw new Error(`No es posible buscar usuarios inactivos en la base de datos: ${err}`);
      }
    }
    
    
}

export default MongoDBContainer;
