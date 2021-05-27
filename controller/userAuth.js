const express = require("express");
const createService = require("../service/create")


const login = (req, res) =>{
    const {email, password} = req.body
    res.render("login")
}

const register = async (req, res) =>{
    const {name, email, mobile, password} = req.body

    const result = await createService(name,email,mobile,password)
    if(result){
        res.status(200)
        .render("cart" ,{
                ejsProducts : []
            })
    }else{
        console.log("error")
    }
}



module.exports = {login, register}