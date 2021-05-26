const express = require("express")

const getGoods = (req, res) =>{
    const {categoryValue} = req.body

    const goods = [
        {
            productName : "Mega Tuna 1",
            productImage : "product1.jpeg",
            orderPrice: 1999.25,
            category : "Canned Goods"
        },
        {
            productName : "Mega Tuna 2",
            productImage : "product1.jpeg",
            orderPrice: 1999.25,
            category : "Canned Goods"
        },
        {
            productName : "Shampoo 1",
            productImage : "product1.jpeg",
            orderPrice: 1999.25,
            category : "Soap and Shampoo"
        },
        {
            productName : "Shampoo 2",
            productImage : "product1.jpeg",
            orderPrice: 1999.25,
            category : "Soap and Shampoo"
        },
        {
            productName : "Shampoo 3",
            productImage : "product1.jpeg",
            orderPrice: 1999.25,
            category : "Soap and Shampoo"
        },
        {
            productName : "Snacks 1",
            productImage : "product1.jpeg",
            orderPrice: 1999.25,
            category : "Snacks"
        },
        {
            productName : "Snacks 2",
            productImage : "product1.jpeg",
            orderPrice: 1999.25,
            category : "Snacks"
        }
    ]

    res.render("goods", {
        ejsGoods : goods,
    })

}


module.exports = {getGoods}