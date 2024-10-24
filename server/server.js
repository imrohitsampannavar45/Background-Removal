import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/Mongodb.js'


//App Config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()


//initialise Middlewares
app.use(express.json())
app.use(cors())
//API Routes
app.get("/", (req,res)=>res.send("API Working"))


app.listen(PORT, ()=> console.log("Server Running on port"  +PORT))
