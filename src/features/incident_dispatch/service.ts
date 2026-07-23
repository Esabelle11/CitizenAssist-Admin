import { IncidentDispatch } from "@/types";

export async function get() {
  const response = await fetch("/api/incident_dispatch");

  if (!response.ok) {
    throw new Error("Failed to load");
  }

  return response.json() as Promise<IncidentDispatch[]>;
}



export async function getById(id:string){   
  const response =await fetch(`/api/incident_dispatch/${id}`);
    
  if(!response.ok){
    throw new Error("Failed loading rule");
  }
  
  return response.json();
  
}

