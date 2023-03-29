import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

import {userRouter} from './routes/users.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

// Endpoints
app.use("/auth", userRouter)

mongoose.connect(`mongodb+srv://jdupont:${process.env.MONGO_PASSWORD}@cluster0.jwqa6xx.mongodb.net/cluster0?retryWrites=true&w=majority`)

app.listen(3001, () => console.log("SERVER STARTED"))