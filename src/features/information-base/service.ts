import { InformationBase } from "@/types";

export async function get() {
  const response = await fetch("/api/information-base");

  if (!response.ok) {
    throw new Error("Failed to load");
  }

  return response.json() as Promise<InformationBase[]>;
}


export async function create(data: Partial<InformationBase>) {
  const response = await fetch(
    "/api/information-base",
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
  const response =await fetch(`/api/information-base/${id}`);
    
  if(!response.ok){
    throw new Error("Failed loading rule");
  }
  
  return response.json();
  
}


export async function update_row(
    id:number,
    data:Partial<InformationBase>
){
   
    const response = await fetch(
      `/api/information-base/${id}`,
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

export async function remove_row(id:number){
   
    const response = await fetch(
      `/api/information-base/${id}`,
      {method:"DELETE"}
    );
      
    if(!response.ok){
      throw new Error("Delete failed");
    }
   
    return response.json(); 
}