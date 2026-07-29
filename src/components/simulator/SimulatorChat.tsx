"use client";

import { ChatMessage } from "./ChatMessage";
import { ChatComposer } from "./ChatComposer";

import type { SimulatorMessage } from "@/types/simulator";


interface Props {
  messages: SimulatorMessage[];
  loading: boolean;
  onSubmit: ( formData: FormData ) => void;
  onSelectMessage: (  message: SimulatorMessage ) => void;
}



export function SimulatorChat({
  messages,
  loading,
  onSubmit,
  onSelectMessage,
}: Props) {

  return (

    <div className=" flex flex-col h-[700px] rounded-lg border bg-background ">

      {/* Message Area */}
      <div className=" flex-1 overflow-y-auto p-4 space-y-4 " >
        {
          messages.length === 0
          ?
            (
              <div className=" flex h-full items-center justify-center text-sm text-muted-foreground " >
                Start a conversation simulation
              </div>
            )
          :
            messages.map(message=>(
              <ChatMessage
                key={message.id}
                message={message}
                onClick={()=> onSelectMessage(message)}
              />
            ))
        }
      </div>

      {/* Composer */}
      <div className=" border-tp-4">
        <ChatComposer loading={loading} onSubmit={onSubmit}/>
      </div>

    </div>

  );

}