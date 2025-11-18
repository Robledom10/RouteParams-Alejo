import { get } from "http";
import { products } from "../data/products.data";

interface productFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const productsService = {
  getAllProducts(filter: productFilter) {
    let result = products;

    if(filter.category) {
        result = result.filter(p => p.category === filter.category);
    }

    if(filter.minPrice !== undefined) {
        result = result.filter(p => p.price >= filter.minPrice!);
    }

    if(filter.maxPrice !== undefined) {
        result = result.filter(p => p.price <= filter.maxPrice!);
    }

    return result;
  }
};
