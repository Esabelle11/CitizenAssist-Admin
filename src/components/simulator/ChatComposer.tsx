"use client";
import {useState} from "react";
import {Send,Paperclip} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";


interface Props {
    loading:boolean;
    onSubmit:( formData:FormData )=>void;
}



export function ChatComposer({
    loading,
    onSubmit
}:Props){

    const [message,setMessage]=useState("");
    const [file,setFile]=useState<File|null>(null);

    const sendMessage=()=>{
        if(!message.trim()&&!file) return;

        const formData = new FormData();
        formData.append("message",message);

        if(file){
            formData.append("file",file);
            formData.append("mediaType",file.type.split("/")[0]);
        }
        onSubmit(formData);
        setMessage("");
        setFile(null);
    };


    return (

    <div className="space-y-3">

        { file &&
            (
            <p className="text-xs text-muted-foreground">
                Attached: {" "} {file.name}
            </p>
            )
        }

        <div className="flex gap-2" >
            <label className=" cursor-pointer flex items-center">
                <Paperclip size={18}/>
                <input
                    type="file"
                    hidden
                    accept=" image/*, audio/*, video/* "
                    onChange={
                        e=> setFile(
                            e.target.files?.[0]
                            ?? null
                        )
                    }
                />
            </label>


            <Textarea
                value={message}
                onChange={ e=> setMessage( e.target.value) }
                placeholder="Ask CitizenAssist AI... "
                className="min-h-[70px]"
            />

            <Button disabled={loading} onClick={sendMessage} >
                <Send className="mr-2 h-4 w-4"/>
                { loading ? "Processing" : "Send" }
            </Button>

        </div>

    </div>
    );
}