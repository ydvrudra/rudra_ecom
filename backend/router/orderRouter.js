const express = require("express");
const router = express.Router();
const {newOrder,getSingleOrder,myOrders, getAllOrders,updateOrder,deleteOrder}  = require('../controllers/orderController');
const {isAuthenticatedUser,authrozeRoles} = require('../middlerware/authcookie');

router.route('/order/new').post(isAuthenticatedUser,newOrder);

router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);

router.route('/orders/me').get(isAuthenticatedUser,myOrders);

router.route('/admin/orders').get(isAuthenticatedUser,authrozeRoles("admin"),getAllOrders);

router.route('/admin/order/:id')
.put(isAuthenticatedUser,authrozeRoles("admin"),updateOrder)
.delete(isAuthenticatedUser,authrozeRoles("admin"),deleteOrder);

module.exports = router;
