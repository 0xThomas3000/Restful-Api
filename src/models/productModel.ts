import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ title: "text" }); // Tìm kiếm theo tiêu đề

const Products = mongoose.model("Products", productSchema);

Products.createIndexes({
  wildcardProjection: {
    _id: 1,
    title: 1,
  },
});

// Products.createIndexes();

export default Products;
