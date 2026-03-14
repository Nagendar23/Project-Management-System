import mongoose from 'mongoose';
import Project from '../models/Project.js';

//get projects
const getProjects = async(req,res)=>{
    try{
        const page = req.query.page ? parseInt(req.query.page) :1;
        const limit = req.query.limit ? parseInt(req.query.limit):10;

        if(isNaN(page) || isNaN(limit) || page<1 || limit<1 ){
            console.log("Invalid pagination params");
            return res.status(400).json({message:"Page and limit must be positive integers"})
        }
        const skip = (page-1)*limit;
        
        const projects = await Project.find().skip(skip).limit(limit);
        const totalProjects = await Project.countDocuments()
        if(projects.length === 0){
            console.log("No projects found");
        }

        console.log('projects has been found', projects)
        return res.status(200).json({
            projects,
            pagination:{
                page,
                limit,
                totalProjects,
                totalPages:Math.ceil(totalProjects / limit)
            }
        })
    }catch(err){
        console.log("some error while fetching the projects ",err)
        return res.status(500).json({message:"Some error while fetchng the projects "})
    }
}

//get project by id
const getProjectById = async(req,res)=>{
    try{
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            console.log("Invalid project id");
            return res.status(400).json({message:"Invalid project id"});
        }

        const project = await Project.findById(id);
        if(!project){
            console.log("No project found with this Id");
            return res.status(404).json({message:"No projects found with this id"})
        }
        console.log(`Project with the id: ${id} has been found `, project)
        return res.status(200).json(project)
    }catch(err){
        console.log("SOme error while fetching the project with the id ",err);
        return res.status(500).json({message:"Some error while fetching project with id"})
    }
}

/// Post project
const postProject = async(req,res)=>{
    try{
        const {name, description} = req.body;
        if(!name || !name.trim()){
            console.log("The project name is required")
            return res.status(400).json({message:"Project name is required"})
        }
        const newProject = await Project.create({name:name.trim(), description});
        if(!newProject){
            console.log("Failed to post a project")
            return res.status(400).json({message:"Failed to post the project"})
        }
        console.log("New project has been posted successfully",newProject)
        return res.status(201).json(newProject)
    }catch(err){
        if(err.code===11000){
            console.log("Project with this name already exists")
            return  res.status(409).json({message:"Project with this name already exists"})
        }
        console.log("Some error occured while posting new project ", err)
        return res.status(500).json({message:"Some error occured while posting project "})
    }
}

// Delete Projects
const deleteProject = async(req,res)=>{
    try{
        const {id}  = req.params;
          if(!mongoose.Types.ObjectId.isValid(id)){
            console.log("Invalid project id");
            return res.status(400).json({message:"Invalid project id"});
        }
        const deletedproject = await Project.findByIdAndDelete(id)
        if(!deletedproject){
            console.log("Project not ofund with that id")
            return res.status(404).json({message:"Project not ofund with that id"})
        }
        console.log("Project has been deleted successfully",deletedproject);
        return res.status(200).json(deletedproject)
    }catch(err){
        console.log("Some error while deleting the project ",err);
        return res.status(500).json({message:"Some error while deleting the project "})
    }

}


/// exporting all this 

export {getProjects, getProjectById, postProject, deleteProject}