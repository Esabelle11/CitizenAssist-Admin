import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const supabase = await createClient();

  const {data:{user}} = await supabase.auth.getUser();

  if(!user){
    return NextResponse.json(
      {message:"Unauthorized"},
      {status:401}
    );
  }

  const {id} = await params;

  const {data,error}=await supabase
    .from("agency_routing")
    .select("*")
    .eq("id",id)
    .single();

  if(error){
    return NextResponse.json(
      {message:error.message},
      {status:500}
    );
  }

  return NextResponse.json(data);

}


export async function PUT(
    request:Request,
    {params}:{params:Promise<{id:string}>}
   ){
   
    const supabase = await createClient();
   
    const {data:{user}} = await supabase.auth.getUser(); 
   
    if(!user){
      return NextResponse.json(
       {message:"Unauthorized"},
       {status:401}
      );
    }
   
    const {id}=await params;
   
    const body=await request.json();
   
    const { data, error}=await supabase
    .from("agency_routing")
    .update(body)
    .eq("id",id)
    .select()
    .single();
   
    if(error){
      return NextResponse.json(
       {message:error.message},
       {status:500}
      );
    }
   
   
    return NextResponse.json(data);
   
}

export async function DELETE(
    request:Request,
    {params}:{params:Promise<{id:string}>}
   ){
   
    const supabase = await createClient();
   
    const {data:{user}} = await supabase.auth.getUser();
    
    if(!user){
      return NextResponse.json(
       {message:"Unauthorized"},
       {status:401}
      );
    }
   
    const {id}=await params;
   
    // const {error}=await supabase
    // .from("agency_routing")
    // .delete()
    // .eq("id",id);

    const { error} = await supabase
      .from("agency_routing")
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
   
   
    if(error){
      return NextResponse.json(
       {message:error.message},
       {status:500}
      );
    }
   
    return NextResponse.json({
      success:true
    });
   
}