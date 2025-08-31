import { v2 as cloudinary } from "cloudinary"
import productModel from '../models/productModel.js'
// function for adding product

const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]


        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? true : false,
            image: imagesUrl,
            date: Date.now()
        }
        console.log(productData);
        const product = new productModel(productData)
        await product.save()


        res.status(201).json({ success: true, message: "product created successfully" })

    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: error.message })
    }
}

// function for listing products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.status(200).json({ success: true, products })

    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, message: error.message })
    }
}

// function for removing products
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.status(202).json({ success: true, message: "product deleted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        console.log(productId);
        
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }
        const product = await productModel.findById(productId)
        console.log(product);
           if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({success:true, product})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: error.message})
        
    }
}


export { addProduct, listProducts, removeProduct, singleProduct }

