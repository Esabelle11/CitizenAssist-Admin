import { TrackedIncident } from "@/types";

export async function get() {
  const response = await fetch("/api/incident");

  if (!response.ok) {
    throw new Error("Failed to load");
  }

  return response.json() as Promise<TrackedIncident[]>;
}



export async function getById(id:string){   
  const response =await fetch(`/api/incident/${id}`);
    
  if(!response.ok){
    throw new Error("Failed loading rule");
  }
  
  return response.json();
  
}

