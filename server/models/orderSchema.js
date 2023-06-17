const mongoose = require("mongoose");
const schema = mongoose.Schema;


const orderSchema = new schema ({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: {type: String,required: true},
            price: {type: Number,required: true},
            qty: {type: Number,required: true},
            image: {type: String,required: true},
            product: {
                type : mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    shippingAddress:{
        address: {type: String,required:true},
        city: {type: String,required:true},
        district: {type: String,required:true},
        state: {type: String,required:true},
        pincode: {type: String,required:true},
        country: {type: String,required:true}

    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        razorpay_payment_id: {type: String},
        razorpay_order_id: {type: String},
        razorpay_signature: {type: String},
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt : {
        type: Date
    },
    isDelivered: {
        type: Boolean
    }
},{timestamps: true});

module.exports = mongoose.model("Order",orderSchema);