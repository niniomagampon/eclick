const Order = require("../models/Order")

// const add = async (payload) => {
// 	try {
// 		const cart = await Cart.findOne({
// 			where: {
// 				accountId: payload.accountId,
// 				productId: payload.productId,
// 			},
// 		});

// 		if (cart === null) await Cart.create(payload);
// 		else
// 			await Cart.update(
// 				{ qty: parseInt(cart.qty) + parseInt(payload.qty) },
// 				{ where: { id: cart.id } }
// 			);

// 		return true;
// 	} catch (err) {
// 		console.log(err);
// 		return err;
// 	}
// };

const getAllOrder = async () =>{
    try{
        return await Order.findAll({})
    }catch(err){
        return err
    }
}

const orderStatus = async ( status ) =>{
    try{
        return await Order.findAll({
            where: {
                order_status : status
            }
        })
    }catch(err){
        return err
    }
}

module.exports = {getAllOrder, 
    orderStatus}