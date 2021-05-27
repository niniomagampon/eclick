const Connection = require("../database/connection")
const bcrypt = require('bcryptjs')


module.exports = async (name, email, mobile, password) =>{

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = await bcrypt.hash(password, salt)
    
    try{
        const query = `INSERT INTO accounts VALUES ` +
        `(null, '${name}','${email}','${mobile}', '${hashedPass}')`

        await Connection(query)

        console.log("New User Created")
        return true
    }

    catch{
        return false
    }

}