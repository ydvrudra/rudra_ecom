const express = require("express");
const router = express.Router();
const {
    home,
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getproductDetails,
    createProductReview,
    getAllProductReviews,
    deleteReview,
    getAdminProducts
} =  require('../controllers/productController');

const {isAuthenticatedUser,authrozeRoles} = require('../middlerware/authcookie');


router.route('/').get(home);

router.route('/products').get(getAllProduct);

router.route('/admin/product/new').post(isAuthenticatedUser,authrozeRoles("admin"),createProduct);

router.route('/admin/products').get(isAuthenticatedUser,authrozeRoles("admin"),getAdminProducts);

router
.route('/admin/product/:id')
.put(isAuthenticatedUser,authrozeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authrozeRoles("admin"),deleteProduct)

router.route('/product/:id').get(getproductDetails);

router.route('/review').put(isAuthenticatedUser,createProductReview);

router.route('/reviews').get(getAllProductReviews).delete(isAuthenticatedUser,deleteReview);



module.exports = router;