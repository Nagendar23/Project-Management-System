import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    project_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    status:{
        type:String,
        enum: ['todo','in-progress','done'],
        required:true
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        required:true,
    },
    due_date:{
        type:Date,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now,
    }
})

const Task = mongoose.model("Task",taskSchema);

export default Task;
