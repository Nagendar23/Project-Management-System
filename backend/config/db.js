import express from 'express'
import mongoose from 'mongoose'

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if(!conn){
            console.log("Failed to connect the MongoDB")
        }
        console.log("MongoDB connected successfully")
    }catch(err){
        console.log("Some error occured while connecting with DB ",err)
    }
}

export default connectDB