const bcrypt = require("bcrypt");
const users = [
    {
        firstName: "Teja",
        lastName :"chavva",
        email: "chavvateja226@gmail.com",
        password:bcrypt.hashSync('Teja1231234@',10),
        isAdmin: true
    },
    {
        firstName: "sabareesh",
        lastName : "chakka",
        email: "chakkasabareesh@gmail.com",
        password: bcrypt.hashSync('Chakka@45234',10),
    },
    {
        firstName: "jagath",
        lastName : "vegiveda",
        email: "vegiveda@gmail.com",
        password: bcrypt.hashSync('Jagath@184366',10)
    }
]

module.exports = users;