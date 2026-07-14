import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = await createClient();

  const {data: { user },} = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      email,
      employee_id,
      department,
      phone,
      last_login,
      created_at,
      role:roles(
        id,
        name
      )
    `)
    .eq("is_active", true)
    .order("created_at", {
      ascending: false,
  });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
  // console.log("user api data: ",data)
  // console.log("user api error: ",error)


  return NextResponse.json(data);
}





export async function POST(request: Request) {

  // Check the logged-in admin
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();
  console.log("body:",body)

  //---------------------------------------
  // Create auth user
  //---------------------------------------

  const {
    data: authUser,
    error: authError,
  } = await adminClient.auth.admin.createUser({
    email: body.email,
    password: body.password,
    email_confirm: true,
  });
  // console.log("authUser: ",authUser)
  // console.log("authError: ",authError)

  if (authError) {
    // console.log("authError: ",authError)
    return NextResponse.json(
      { message: authError.message },
      { status: 500 }
    );
  }

  //---------------------------------------
  // Create profile
  //---------------------------------------

  const {
    data: profile,
    error: profileError,
  } = await adminClient
    .from("profiles")
    .insert({
      id: authUser.user.id,
      email: body.email,
      full_name: body.full_name,
      role_id: body.role_id,
      department: body.department,
      employee_id: body.employee_id,
      phone: body.phone,
      is_active: true,
    })
    .select()
    .single();

  if (profileError) {

    // console.log("profileError: ",profileError)
    // Roll back auth user if profile creation fails
    await adminClient.auth.admin.deleteUser(
      authUser.user.id
    );

    return NextResponse.json(
      { message: profileError.message },
      { status: 500 }
    );
  }

  return NextResponse.json(profile);

}