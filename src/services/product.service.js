import ProductRepository from "../models/repository/product.repository.js";

const repository = new ProductRepository();

async function getAll() {
  return await repository.getAll({deletedAt:{$exists:false}});
}

async function addProduct(product) {
  return await repository.create(product);
}

async function getProductById(id) {
  const product = await repository.getProdById(id);
  if (!product) {
    throw new Error('No se encontró el producto');
  }
  return product;
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
async function getProductsByUser(userId) {
  return await repository.getProductsByUser(userId);
}

export default {
  getAll,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProductByQuery,
  getProductsByUser
};
