const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const ConnectDB = async ()=>{
    const url = process.env.MONGO_URI;
    try{
        console.log(url);
        const connec = await mongoose.connect(url,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`MONGODB is on: ${connec.connection.host}`);
    }
    catch(error){
        console.log(`Error: ${error}`);
        process.exit(1);
    }
}

module.exports = ConnectDB;