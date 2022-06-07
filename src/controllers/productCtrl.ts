import Products from "../models/productModel";
import { APIfeatures } from "../lib/features";

const productCtrl = {
  getProducts: async (req: any, res: any) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .paginating()
        .sorting()
        .searching()
        .filtering();

      const result = await Promise.allSettled([
        features.query,
        Products.countDocuments(), //count number of products.
      ]);

      const products = result[0].status === "fulfilled" ? result[0].value : [];
      const count = result[1].status === "fulfilled" ? result[1].value : 0;

      return res.status(200).json({ products, count });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getProduct: async (req: any, res: any) => {
    try {
      const product = await Products.findById(req.params.id);

      if (!product)
        return res.status(404).json({ msg: "This product does not exist." });

      return res.status(200).json(product);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addProduct: async (req: any, res: any) => {
    try {
      const { title, price, description, category, image } = req.body;

      const newProduct = new Products({
        title,
        price,
        description,
        category,
        image,
      });
      await newProduct.save();

      return res.status(200).json(newProduct);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req: any, res: any) => {
    try {
      const { title, price, description, category, image } = req.body;

      const product = await Products.findByIdAndUpdate(
        req.params.id,
        {
          title,
          price,
          description,
          category,
          image,
        },
        { new: true }
      );

      if (!product)
        return res.status(404).json({ msg: "This product does not exist." });

      return res.status(200).json(product);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req: any, res: any) => {
    try {
      const product = await Products.findByIdAndDelete(req.params.id);

      if (!product)
        return res.status(404).json({ msg: "This product does not exist." });

      return res.status(200).json({ msg: "Delete Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default productCtrl;
