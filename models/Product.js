import mongoose from "mongoose"

const productsSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    }

})

export default mongoose.models.product || mongoose.model('product', productsSchema)