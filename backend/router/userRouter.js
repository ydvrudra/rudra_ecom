const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    forgotPassword,
    logoutUser,
    resetPassword,
    updatePassword,
    updateProfile,
    getUserDetails,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser,
} = require('../controllers/userController');
const {isAuthenticatedUser,authrozeRoles} = require('../middlerware/authcookie');


router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser,getUserDetails);

router.route('/password/update').put(isAuthenticatedUser,updatePassword);

router.route('/me/update').put(isAuthenticatedUser,updateProfile);

router.route('/admin/users').get(isAuthenticatedUser,authrozeRoles('admin'),getAllUser);

router.route('/admin/user/:id')
.get(isAuthenticatedUser,authrozeRoles('admin'),getSingleUser)
.put(isAuthenticatedUser,authrozeRoles('admin'),updateUserRole)
.delete(isAuthenticatedUser,authrozeRoles('admin'),deleteUser);



module.exports = router;