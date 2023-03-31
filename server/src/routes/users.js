import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {UserModel} from '../models/Users.js'
import * as dotenv from 'dotenv'

dotenv.config()
const router = express.Router()


router.post("/register", async (req, res) => {
    const { username, password} = req.body
    // Query username in the DB
    const user =await UserModel.findOne({username});

    // Check if username already exist in DB.
    if (user) {
        return res.json({
            message: "User already exists!"
        })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the user to the DB
    const newUser = new UserModel({username, password : hashedPassword})
    await newUser.save()

    res.json({
        message: "User Registered Successfully!"
    })
 })
 
//  We create a JSON Web Token when user logged in. Send token to front-end. For each request, the token will need to be validated.
router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username})

    // Check if user exist
    if (!user) {
        return res.json({
            message: "User Does Not Exist!"
        })
    }

    // Check if password from front-end match with the one in DB
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.json({
            message: "Username or Password Incorrect!"
        })
    }

    // Create Web Token.
    // 'sign()' takes a 'secret' that allows us to verify that the user is auth. Use the same secret.
    const token = jwt.sign({id: user._id}, process.env.AUTH_SECRET)

    res.json({
        token,
        userID: user._id
    }) 
})


export {router as userRouter};