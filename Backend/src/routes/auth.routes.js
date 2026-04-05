const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller")
const authmiddleware = require("../middlewares/auth.middleware")

/**
 * @route POST /api/auth/register
 * @description Register new user 
 * @access Public
 */

authRouter.post("/register",authController.registerUserController)

/**
 * @route POST /api/auth/logIn
 * @description LogIn user 
 * @access Public
 */
authRouter.post("/login",authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description Logout user / clear cookie / clear token from user cookie and add token to blacklist 
 * @access Public
 */
authRouter.get("/logout",authController.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */

authRouter.get("/get-me",authmiddleware.authUser,authController.getmeController)




module.exports = authRouter;