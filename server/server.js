const express = require("express");
const path = require("path")
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const createHttpError = require("http-errors");
const ConnectDB = require('./connect/db');
const ProductRoutes = require("./routes/ProductRoute");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require('./routes/profileRoutes');
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authorization = require("./middleware/authorization");
const admin = require("./middleware/admin")

const app = express();
app.use(morgan());
app.use(express.json());
app.use(cors());
require("dotenv").config();
ConnectDB();


app.get('/',(req,res)=>{
    res.send("API is running");
})

app.use('/api/products',ProductRoutes);

// app.use((req,res,next)=>{
//     next(createHttpError.NotFound());
// })

app.use('/api/users',userRoutes);
app.use('/api/upload',uploadRoutes)
app.use('/profile',authorization,profileRoutes);


app.use('/api/orders',authorization,orderRoutes);
app.use('/api/payment',authorization,paymentRoutes);
app.use('/api/admin',authorization,admin,adminRoutes);

__dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    return res.send({
        status:error.status||500,
        message:error.message
    })
})
const PORT = process.env.PORT||5000;
app.listen(PORT,console.log(`Server is runnning in ${process.env.NODE_ENV} mode on the port ${PORT}`));