const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name : {
        type: String,
        required: true,
        unique: true
    },
    sizes:{
        type: Array,
        required:true,
    },
    image : {
        type: String,
        required: true
    },
    brand : {
        type : String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }

},{
    timestamps: true
})
module.exports = mongoose.model("Product",productSchema);