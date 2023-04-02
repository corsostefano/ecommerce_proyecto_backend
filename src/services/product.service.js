import ProductRepository from "../models/repository/product.repository.js";

const repository = new ProductRepository();

async function getAll() {
  return await repository.getAll({deletedAt:{$exists:false}});
}

async function addProduct(product) {
  return await repository.create(product);
}

async function getProductById(id) {
  return await repository.getProdByid(id);
}

async function updateProductById(id, data) {
  return await repository.update(id, data);
}

async function deleteProductById(id) {
  return await repository.delete(id);
}
async function searchProductByQuery(query){
  return await repository.searchProducts(query)
}

export default {
  getAll,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProductByQuery
};
