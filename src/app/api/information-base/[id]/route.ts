import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateEmbedding } from "@/lib/embedding"; // Import your new helper!


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
  .from("information_base")
  .select("id, category, name, search_summary, content, is_active, updated_at")
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
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user },} = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  const body = await request.json();

  const {
    category,
    name,
    search_summary,
    content,
  } = body;

  const updatePayload: any = {};

  if (category !== undefined) updatePayload.category = category;
  if (name !== undefined) updatePayload.name = name;
  if (content !== undefined) updatePayload.content = content;

  // Only regenerate embedding if search_summary changed
  if (search_summary !== undefined) {
    updatePayload.search_summary = search_summary;
  
    const { data: existing, error } = await supabase
      .from("information_base")
      .select("search_summary")
      .eq("id", id)
      .single();
  
    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  
    if (search_summary !== existing.search_summary) {
      updatePayload.summary_embedding =
        await generateEmbedding(search_summary);
    }
  }

  const { data, error } = await supabase
    .from("information_base")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
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
      .from("information_base")
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