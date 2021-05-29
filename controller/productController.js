const express = require("express")
const createProduct = require("../service/createProduct")

const addProduct = async (req, res) =>{
    const {name, description, category, image, price} = req.body

    const result = await createProduct(name, description, category, image, price);

    if(!result){
        console.log("Error")
    }

    if(result){
        await res.render("serverMessage",{
            ejsPageTitle : "Product Successfully Added",
            ejsHeadBackground : "bg-success",
            ejsMessageTitle : `${name} Added to Products`,
            ejsServerMessage : `${name} has been added to ${category} with price of Php ${price}`,
            ejsRedirectPage : `/product/${name}`,
            ejsMessageButton: "View Product"
        })
    }
}