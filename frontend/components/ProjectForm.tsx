"use client";
import { useState } from "react";
import { createProject } from "@/lib/api";

type ProjecctFormProps = {
    onCreated:()=> void
};

export default function ProjectForm({ onCreated } :ProjecctFormProps){
    const [name,setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!name.trim()){
            setError("Project name is required");
            return;
        }
        try{
            setLoading(true);
            setError("");
            await createProject({
                name:name.trim(),
                description:description.trim() || undefined
            });
            setName("")
            setDescription("")
            onCreated();
        }catch(err){
            console.log(err);
            setError("Failed to create project")
        }finally{
            setLoading(false)
        }
    }

    return(
        <section className="panel mb-6">
            <h2 className="section-title">Create Project</h2>
            <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
                <input type="text"
                placeholder="Project name" 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                
                />
                <textarea name="description"
                    placeholder="Project Description"
                    rows={4}
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <button type="submit" disabled={loading} className="w-fit px-5">
                    {loading ? "Creating..." : "Create Project"}
                </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </section>
    )
}