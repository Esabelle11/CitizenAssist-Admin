import { AgencyRouting } from "@/types";

export async function get() {
  const response = await fetch("/api/agency-routing");

  if (!response.ok) {
    throw new Error("Failed to load");
  }

  return response.json() as Promise<AgencyRouting[]>;
}


export async function create(data: Partial<AgencyRouting>) {
  const response = await fetch(
    "/api/agency-routing",
    {
      method: "POST",
      headers: { "Content-Type": "application/json",},
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Create failed");
  }

  return response.json();
}


export async function getById(id:string){   
  const response =await fetch(`/api/agency-routing/${id}`);
    
  if(!response.ok){
    throw new Error("Failed loading rule");
  }
  
  return response.json();
  
}


export async function update_row(
    id:string,
    data:Partial<AgencyRouting>
){
   
    const response = await fetch(
      `/api/agency-routing/${id}`,
      {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      }
    );

    if(!response.ok){
      throw new Error("Update failed");
    }
    return response.json();
   
}

export async function remove_row(id:string){
   
    const response = await fetch(
      `/api/agency-routing/${id}`,
      {method:"DELETE"}
    );
      
    if(!response.ok){
      throw new Error("Delete failed");
    }
   
    return response.json(); 
}