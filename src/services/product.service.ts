import { get } from "http";
import { products } from "../data/products.data";
import { Product } from "../models/product.model"

interface productFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface productInput {
  name: string;
  price: number;
  category: string;
}

interface ProductUpdate {
  name?: string;
  price?: number;
  category?: string;
}


export const productsService = {
  getAllProducts(filter: productFilter) {
    let result = products;

    if (filter.category) {
      result = result.filter(p => p.category === filter.category);
    }

    if (filter.minPrice !== undefined) {
      result = result.filter(p => p.price >= filter.minPrice!);
    }

    if (filter.maxPrice !== undefined) {
      result = result.filter(p => p.price <= filter.maxPrice!);
    }

    return result;
  },

  getById(id: Number) {
    return products.find(p => p.id === id)
  },

  postProduct(data: productInput) {
    const lastProduct = products[products.length - 1];
    const newId = lastProduct ? lastProduct.id + 1 : 1;


    const newProduct = new Product(
      newId,
      data.name,
      data.price,
      data.category
    );

    products.push(newProduct);
    return newProduct
  },

  putProduct(id: number, data: ProductUpdate) {
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return null;
    }

    const product = products[index];
    if (!product) return null;

    if (data.name !== undefined) product.name = data.name;
    if (data.price !== undefined) product.price = data.price;
    if (data.category !== undefined) product.category = data.category;
    return product;
  },

  delete(id: number) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products.splice(index, 1);
    return true;
  }

};

