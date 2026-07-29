import { Bot, User, Brain, Loader2 } from "lucide-react";
import type { SimulatorMessage } from "@/types/simulator";
    
    
    
interface Props {
    message: SimulatorMessage;
    onClick:()=>void;
}
    
    
    
export function ChatMessage({
    message,
    onClick
}:Props){  
    const isUser = message.role==="user";
       
    return (
    
    <div onClick={!isUser?onClick:undefined}  className={` flex gap-3 ${!isUser ? "cursor-pointer" :"" } `} >
    
        <div className=" flex h-8 w-8 items-center justify-center rounded-full bg-muted " >
            { isUser ?<User size={16}/> :<Bot size={16}/> }
        </div>
        
        <div className={` max-w-[80%] rounded-lg  p-3 text-sm  ${isUser ?"bg-blue-600 text-white ml-auto": "bg-muted"} `} >

            {message.isLoading 
                ?
                (<div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    <span>  Thinking... </span>
                </div>
                )
                :
                (<p>{message.content}</p> )
            }

            { !isUser && !message.isLoading &&  message.result &&
                (
                    <div className=" mt-2 flex items-center gap-1 text-xs text-muted-foreground  ">
                        <Brain size={12}/>
                        Click to inspect AI analysis
                    </div>
                )
            }

        </div>
    
    </div>
    
    );
    
}