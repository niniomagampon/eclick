const express = require("express");


const displayOrder = (req, res) =>{

    const products = [
        {
            productName : "Gucci",
            productImage : "product1.jpeg",
            orderQuantity : 1,
            orderPrice: 1999.25,
            paymentMethod: "COD",
            orderStatus: "Shipping"
        },
        {
            productName : "Leane",
            productImage : "leane.jpg",
            orderQuantity : 1,
            orderPrice: 1999.25,
            paymentMethod: "COD",
            orderStatus: "Cancelled"
        },
        {
            productName : "Adidas",
            productImage : "adidas.jpeg",
            orderQuantity : 1,
            orderPrice: 1999.25,
            paymentMethod: "COD",
            orderStatus: "Received"
        }
    ]
    res.render("cart",{
        ejsProducts : products
    })
} 


module.exports = {displayOrder}