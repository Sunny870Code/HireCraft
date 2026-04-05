const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")


/**
 * 
 * @name POST registeruserController
 * @description Register a new user , expects username , email and passowrd
 * @access Public 
 */

const registerUserController = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide all the required details"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        if (isUserAlreadyExists.username == username) {
            return res.status(400).json({
                message: `Account with ${username} already exists`
            })
        }
        else {
            return res.status(400).json({
                message: `Account with ${email} already exists`
            })
        }
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User Register successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }

    })

}

/**
 * 
 * @name POST loginuserController
 * @description login a  user , expects email and passowrd
 * @access Public 
 */

const loginUserController = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "user not found. SignUp first."
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid Credentials."
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token",token);
    res.status(200).json({
        message:"User loggedIn Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/**
 * 
 * @name POST logoutUserController
 * @description logout a  user , expects token
 * @access public 
 */

const logoutUserController = async(req,res) =>{
    const token = req.cookies.token;
    
    if(token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token");

    res.status(200).json({
        message:"User logged out Successfully"
    })
}  

/**
 * 
 * @name GET getmeController
 * @description get the data of current loggedin user
 * @access private
 * 
 */

async function getmeController(req,res){
    const user  = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"user details fetch successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}



module.exports = { registerUserController , loginUserController , logoutUserController,getmeController}