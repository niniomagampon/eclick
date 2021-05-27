const express = require("express");
const connection = require("../database/connection ")
const bcrypt = require('bcryptjs')


const {name, email, mobile, password} = req.body

const login = (req, res) =>{

}


const register = async (req, res) =>{

    bcrypt.hash(password, 10 ,(err, hashedPass) =>{
        if(err){
            console.log(err)
            res.json({
                error : err
            })
        }
    })

    
    try{
        const query = `
        INSERT INTO ` +
        `accounts ` + 
        `VALUES ` +
        `(null, '${name}','${email}','${mobile}', bcrypt'${hashedPass}')
        `
        await connection(query)

        res.render()

    }

    catch{
        return false
    }

}


module.exports = {login, register}