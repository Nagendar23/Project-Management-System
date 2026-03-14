export type Project = {
    _id: string;
    name: string;
    description: string;
    created_at? : string;
};

export type ProjectsListResponse={
    projects:Project[];
    pagination:{
        page:number;
        limit:number;
        totalProjects:number;
        totalPages:number;
    };
};