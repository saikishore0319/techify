import productModel from "../models/productModel.js";

export const getInventory = async (req, res) => {
  try {
    const products = await productModel.find({}, "name stock price category");
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { productId, stock } = req.body;
    await productModel.findByIdAndUpdate(productId, { stock });
    res.status(200).json({ success: true, message: "Inventory updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
