const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
    generateAccesToken: async(user_id)=>{
        try{
            const payload = {id:user_id};
            const secret = process.env.ACCESS_TOKEN_KEY;
            const options = {
                expiresIn: "7d"
            };
            const access_token = await jwt.sign(payload,secret,options);
            return {access_token};
        }
        catch(error){
            return {error};
        }
    }
}