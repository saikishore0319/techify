import userModel from "../models/userModel.js"



// add to cart
const addToCart = async (req, res) => {
    try {
        const { itemId } = req.body
        const { userId } = req

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData 

        if (cartData[itemId]) {
          cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.status(200).json({ success: true, message: "Item added to cart successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })

    }
}

// update cart
const updateCart = async (req, res) => {
    try {
        const { itemId, quantity } = req.body
        const { userId } = req
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId]= quantity

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.status(200).json({ success: true, message: "cart updated" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// view the cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req
        const userData = await userModel.findById(userId)
        const cartData = userData.cartData
        res.status(200).json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

export { addToCart, updateCart, getUserCart }