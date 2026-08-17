"use client";

import { useState } from "react";
import {RefreshCcw} from "lucide-react";
import { PageHeader } from "@/components/layout/header";
import { useI18n } from "@/lib/i18n/context";
import {Button} from "@/components/ui/button";

import {SimulatorChat} from "@/components/simulator/SimulatorChat";
import { IntentCard } from "@/components/simulator/IntentCard";
import { RoutingCard } from "@/components/simulator/RoutingCard";
import { RagCard } from "@/components/simulator/RagCard";
import { ResponseCard } from "@/components/simulator/ResponseCard";
import { JsonViewer } from "@/components/simulator/JsonViewer";

import type {
  SimulatorMessage,
  SimulationResult,
} from "@/types/simulator";


export default function SimulatorPage(){
  const [messages,setMessages] = useState<SimulatorMessage[]>([]);
  const [selectedResult,setSelectedResult] = useState<SimulationResult|null>(null);
  const [loading,setLoading] = useState(false);

  const handleSimulation = async (
    formData: FormData
  ) => {
    try {

      setLoading(true);

      const userText =  formData.get("message") as string;
      const userMessage: SimulatorMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: userText,
        timestamp: new Date()
      };

      // Add user message
      setMessages(prev => [ ...prev,  userMessage ]);


      // Add temporary bot loading message
      const loadingMessageId =  crypto.randomUUID();

      const loadingMessage: SimulatorMessage = {
        id: loadingMessageId,
        role:"assistant",
        content:"",
        timestamp:new Date(),
        isLoading:true
      };

      setMessages(prev => [  ...prev, loadingMessage ]);
      const previousMessages =  messages.map(msg=>({ role:msg.role, content:msg.content }));
      formData.append( "previousMessages", JSON.stringify(previousMessages) );

      console.log("formData: ",formData)

      const res = await fetch(
        "/api/simulator",
        {
          method:"POST",
          body:formData
        }
      );

      const data =  await res.json();
      console.log("res_data: ",data)

      const assistantMessage: SimulatorMessage = {
        id:loadingMessageId,
        role:"assistant",
        content:data.response,
        timestamp:new Date(),
        result:data,
        isLoading:false
      };

      setMessages(prev =>
        prev.map(msg =>
          msg.id === loadingMessageId
          ? assistantMessage
          : msg
        )
      );

      setSelectedResult(data);


    }
    catch(error){
      console.error(error);
    }
    finally{
      setLoading(false);
    }

  };


  const resetChat=()=>{
    setMessages([]);
    setSelectedResult(null);
  };

  return (
    <>
      <PageHeader title="AI Simulator"  subtitle="Test CitizenAssist AI conversation workflow"/>

      {/* <div className="flex justify-end mb-4">
        <Button  variant="outline" onClick={resetChat} >
          <RefreshCcw  className="mr-2 h-4 w-4"/>
          Reset Simulation
        </Button>
      </div> */}

      <div className="grid lg:grid-cols-5 gap-6">
     

        {/* CHAT */}
        <div className="lg:col-span-2">
          <div className="flex justify-end mb-4">
            <Button  variant="outline" onClick={resetChat} >
              <RefreshCcw  className="mr-2 h-4 w-4"/>
              Reset Simulation
            </Button>
          </div>
          <SimulatorChat
            messages={messages}
            loading={loading}
            onSubmit={handleSimulation}
            onSelectMessage={(message)=>{
              if(message.result){
                setSelectedResult( message.result );
              }
            }}
          />
        </div>


        {/* ANALYSIS */}
        <div className="lg:col-span-3 space-y-4">
          {  selectedResult &&
            <>
              <IntentCard analysis={ selectedResult.analysis} />
              <RoutingCard routing={selectedResult.routing } />
              {/* <RagCard documents={selectedResult.rag}/> */}
              <ResponseCard response={ selectedResult.response }/>
              <JsonViewer data={ selectedResult }/>
            </>
          }
        </div>

      </div>
    </>
  )
}