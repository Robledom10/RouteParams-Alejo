import { Request, Response } from "express";
import { productsService } from "../services/product.service";
import { error } from "console";

export const productsController = {
  getAllProducts(req: Request, res: Response) {
    try {
      const { category, minPrice, maxPrice } = req.query;

      if (minPrice != undefined && isNaN(Number(minPrice))) {
        return res.status(400).json({ message: "El parametro de minPrice debe ser un numero" });
      }

      if (maxPrice != undefined && isNaN(Number(maxPrice))) {
        return res.status(400).json({ message: "El parametro de maxPrice debe ser un numero" });
      }

      const products = productsService.getAllProducts({
        category: category as string | undefined,
        minPrice: minPrice !== undefined ? Number(minPrice) : undefined,
        maxPrice: maxPrice !== undefined ? Number(maxPrice) : undefined,
      });

      return res.json(products);

    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      if (isNaN(numericId)) {
        return res.status(400).json({ message: 'El id debe ser un número.' })
      }

      const products = productsService.getById(numericId);

      if (!products) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }

      return res.json(products)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  postProduct(req: Request, res: Response) {
    try {
      const { name, category, price } = req.body;

      if (!name || !price || !category) {
        return res.status(400).json({ error: 'Se requieren nombre, precio y categoría.' });
      }

      if (isNaN(Number(price))) {
        return res.status(400).json({ error: 'El precio debe ser un número.' })
      }

      const newProduct = productsService.postProduct({
        name,
        price: Number(price),
        category
      });

      return res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  putProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      if (isNaN(Number(numericId))) {
        return res.status(400).json({ message: 'El ID debe ser un número' });
      }

      const { name, price, category } = req.body;

      if (price !== undefined && isNaN(Number(price))) {
        return res.status(400).json({ message: 'El precio debe ser un número' });
      }

      const updated = productsService.putProduct(numericId, {
        name,
        price: price !== undefined ? Number(price) : undefined,
        category
      });

      if (!updated) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json(updated);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },

  delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const numericId = Number(id);

      
      if (isNaN(numericId)) {
        return res.status(400).json({ error: "El ID debe ser un número" });
      }

      const deleted = productsService.delete(numericId);

      if (!deleted) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json({ message: "Producto eliminado satisfactoriamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }

  }

}