import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    bestseller: {
        type: Boolean,
    },
    date: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        default: 0
    }
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel