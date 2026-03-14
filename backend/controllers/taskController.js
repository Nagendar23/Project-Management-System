import mongoose from "mongoose";
import Task from '../models/Task.js'
import Project from "../models/Project.js";

//get tasks         => (GET /projects/{project_id}/tasks)
const getTasks = async(req,res)=>{
    try{
        const {project_id} = req.params;
        const {status, sort} = req.query;

        if(!mongoose.Types.ObjectId.isValid(project_id)){
            console.log("Invalid project id");
            return res.status(400).json({message:"Invalid project id"});
        }

        const project = await Project.findById(project_id);
        if(!project){
            console.log("No project exists with this Id")
            return res.status(404).json({message:"No project exists with this id"})
        }

        const query = {project_id};

        if(status){
            query.status = status;
        }

        let tasksData = Task.find(query);

        if(sort === "asc"){
            tasksData = tasksData.sort({due_date: 1});
        }else if(sort === "desc"){
            tasksData = tasksData.sort({due_date: -1});
        }

        const tasks = await tasksData;

        if(tasks.length ===0){
            console.log("No tasks found")
        }

        console.log('All the tasks has been fetched ',tasks)
        return res.status(200).json(tasks)
    }catch(err){
        console.log("Some error while fetching tasks ",err)
        return res.status(500).json({message:"Some error while fetching tasks"})
    }
}

/// post tasks   =>(POST /projects/{project_id}/tasks)

const postTask = async(req,res)=>{
    try{
        const {project_id} = req.params;
        const {title, description, status,priority, due_date} = req.body;

        if(!mongoose.Types.ObjectId.isValid(project_id)){
            console.log("invalid project id ")
            return res.status(400).json({message:"Invalid project id"})
        }
        if(!title || !status || !priority || !due_date){
            console.log('title, status, priority, due-date is required')
            return res.status(400).json({message:"title, status, priority, due-date is required"})
        }

        const project = await Project.findById(project_id)
        if(!project){
            console.log("No project found with this id")
            return res.status(404).json({message:"No project found with this id"})
        }
        const addTask = await Task.create({project_id, title, description, status, priority, due_date})
        console.log("successfully posted new task",addTask)
        return res.status(201).json(addTask)
    }catch(err){
        console.log('SOme error while posting a task',err)
        return res.status(500).json({message:"Some error while posting a task"})
    }
}

// edit a task   =>(PUT /tasks/{id})
const editTask = async(req,res)=>{
    try{
        const {id} = req.params;
        const {title, description, status, priority, due_date} = req.body

        if(!mongoose.Types.ObjectId.isValid(id)){
            console.log("invalid task id")
            return res.status(400).json({message:"Invalid task id"})
        }
        const updates = {title, description, status, priority, due_date}

        const task = await Task.findByIdAndUpdate(id, updates, {new:true, runValidators:true}) //with the help of runValidarots we make sure that enum/date types cannot be bypassed 
        if(!task){
            console.log("task not found");
            return res.status(404).json({message:"Task not found"})
        }
        console.log("Successfully edited a task",task)
        return res.status(200).json(task)
    }catch(err){
        console.log("Some error while editing a task", err)
        return res.status(500).json({message:"Some error while editing a task"})
    }
}

// Delete a task   =>(DELETE /tasks/{id})
const deleteTask = async(req,res)=>{
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            console.log('Invalid task id')
            return res.status(400).json({message:"Invalid task id"})
        }
        const deletedtask = await Task.findByIdAndDelete(id)
        if(!deletedtask){
            console.log("No task found with the id")
            return res.status(404).json({message:"No task found with the id"})
        }
        console.log("Task has been successfully deleted",deletedtask)
        return res.status(200).json(deletedtask)
    }catch(err){
        console.log("Some error while deleting task",err)
        return res.status(500).json({message:"SOme error while deleting task"})
    }
}

export {getTasks, postTask, editTask, deleteTask}