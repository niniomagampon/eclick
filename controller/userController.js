const retrieveService = require("../service/retrieveUser")
const createUser = require("../service/createUser")

const index = async (req, res) =>{
    const users = await retrieveService.getAllUsers();

    if(users){
        res.render("admin/users/index",{
            users
        })
    }
    else{
        console.log("error")
    }
}

const add = async (req, res)=>{

    const {name,email,mobile,password} = req.body

    const user = await createUser(name ,email ,mobile ,password, 'staff');

    const users = await retrieveService.getAllUsers();

    if (typeof user === "boolean" && user === true){
        res.render("admin/users/index",{
            users
        })
    }
    else{
       return("have error")
    }
}

module.exports = {index, add}