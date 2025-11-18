import { Request, Response } from "express";
import { productsService } from "../services/product.service";

export const productsController = {
  getAllProducts(req: Request, res: Response){
    try {
      const { category, minPrice, maxPrice } = req.query;

      if (minPrice != undefined && isNaN(Number(minPrice))) {
        res.status(400).json({ message: "El parametro de minPrice debe ser un numero" });
      }

      if (maxPrice != undefined && isNaN(Number(maxPrice))) {
        res.status(400).json({ message: "El parametro de maxPrice debe ser un numero" });
      }

      const products = productsService.getAllProducts({
        category: category as string | undefined,
        minPrice: minPrice !== undefined ? Number(minPrice) : undefined,
        maxPrice: maxPrice !== undefined ? Number(maxPrice) : undefined,
      });

      return res.json(products);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};