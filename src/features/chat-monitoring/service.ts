import { ChatSession } from "@/types";
import { ChatMessage } from "@/types";

export async function getSessions() {
  const response = await fetch("/api/chat-monitoring");

  if (!response.ok) {
    throw new Error("Failed to load");
  }

  return response.json() as Promise<ChatSession[]>;
}



export async function getMessages(id:string){   
  const response =await fetch(`/api/chat-monitoring/${id}`);
    
  if(!response.ok){
    throw new Error("Failed loading rule");
  }
  
  return response.json() as Promise<ChatMessage[]>;
  
}


