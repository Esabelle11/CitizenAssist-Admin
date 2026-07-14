import { AdminUser } from "@/types";

export async function get(): Promise<AdminUser[]> {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error("Failed to load users");
  }

  const data = await response.json();

  const users: AdminUser[] = data.map((user: any) => ({
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    role: user.role?.name ?? "-",
    role_id: user.role?.id ?? "-",
    is_active: user.is_active,
    last_login: user.last_login,
    created_at: user.created_at,
    employee_id: user.employee_id,
    department: user.department,
    phone: user.phone,
  }));

  return users;
}


export async function getRoles(){

  const response = await fetch(
      "/api/roles"
  );


  if(!response.ok){
      throw new Error(
          "Failed to load roles"
      );
  }

  console.log("response:",response)


  return response.json();

}

export async function create(data: Partial<AdminUser>) {
  const response = await fetch(
    "/api/users",
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
  const response =await fetch(`/api/users/${id}`);
    
  if(!response.ok){
    throw new Error("Failed loading rule");
  }
  
  return response.json();
  
}


export async function update_row(
    id:string,
    data:Partial<AdminUser>
){
   
    const response = await fetch(
      `/api/users/${id}`,
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
      `/api/users/${id}`,
      {method:"DELETE"}
    );
      
    if(!response.ok){
      throw new Error("Delete failed");
    }
   
    return response.json(); 
}