import mongoose from "mongoose";

const userShcema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required: true
    },
    cartData:{
        type: Object,
        default: {}
    },
    
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model('user',userShcema)

export default userModel