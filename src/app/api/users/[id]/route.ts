import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";


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
    .from("profiles")
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
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id:string }>
  }
){

  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();
  if(!user){
    return NextResponse.json(
      { message:"Unauthorized"},
      {status:401}
    );
  }

  const {id} = await params;
  const body = await request.json();
  console.log("body:",body)

  const {
    password,
    ...profileData
  } = body;



  /**
   * Update password only if provided
   */
  if(password && password.trim() !== ""){
    const {error:passwordError} = await adminClient.auth.admin.updateUserById(id,{password});

    if(passwordError){
      return NextResponse.json(
        {message:passwordError.message },
        {status:500}
      );
    }
  }
  /**
   * Update email only if provided
   */
  if(body.email){
    const {error:emailError} = await adminClient.auth.admin.updateUserById(id, { email: body.email });

    if(emailError){
      return NextResponse.json(
        {message:emailError.message },
        {status:500}
      );
    }
  }



  /**
   * Update profiles
   */
  const {
    data,
    error

  } = await adminClient
    .from("profiles")
    .update({
      ...profileData,
      updated_at:new Date().toISOString()
    })
    .eq(
      "id",
      id
    )
    .select()
    .single();



  if(error){

    return NextResponse.json(
      {
        message:error.message
      },
      {
        status:500
      }
    );

  }



  return NextResponse.json(data);

}


export async function DELETE(
  request: Request,
  {params,}: {params: Promise<{ id: string }>;}
  ) {

  // normal client for checking logged-in admin
  const supabase = await createClient();
  const {data: {user}} = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized"},
      { status: 401}
    );
  }

  const {id} = await params;


  /**
   * 1. Disable Supabase Auth user
   */
  const {error: authError} = await adminClient.auth.admin.updateUserById(
    id,
    {ban_duration: "876000h"}
  );


  if (authError) {

    console.error("AUTH DELETE ERROR:", authError);

    return NextResponse.json(
      { message: authError.message},
      {status:500}
    );

  }



  /**
   * 2. Soft delete profile
   */
  const { data, error } = await adminClient
    .from("profiles")
    .update({
      is_active:false,
      updated_at:new Date().toISOString(),
    })
    .eq("id",id)
    .select();



  if(error){

    console.error("PROFILE DELETE ERROR:",error);

    return NextResponse.json(
      { message:error.message},
      {status:500}
    );

  }

  return NextResponse.json({
    success:true,
    data
  });

}