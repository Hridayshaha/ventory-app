// Module Import
const {Schema, model} = require('mongoose')

// Product Schema Design
const productSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type:String,
        required: [true, "Please enter a product name"]
    },
    price: {
        type: String,
        required: [true, "Please enter a product price"]
    },
    stock: {
        type: Number,
        required: [true, "Please product stock"]
    },
    description: {
        type: String,
        required: [true, "Please enter a product description"]
    },
    sku: {
        type: String,
        required: [true, "Please product sku"]
    },
    category: {
        type: String,
        required: [true, "Please product category"],
        trim: true,
    },
    image: {
        type: string,
        default: ""
    }
}, {
    timestamps: true
})

// Model Creation
const Product = model("Product", productSchema);

// Module Export
module.exports = Product;