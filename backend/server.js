import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB  from './config/db.js'
import projectRouter from './routes/projectRoutes.js'
import taskRouter from './routes/taskRoutes.js'


const app=express()
dotenv.config()
app.use(express.json())
connectDB();
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

const PORT = process.env.PORT || 8000



app.use('/',projectRouter);

app.use('/',taskRouter)

app.listen(PORT,()=>{
    console.log(`The server is running on the port ${PORT}`)
})