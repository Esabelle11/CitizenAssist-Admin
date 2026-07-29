import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
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

  const { data, error } = await supabase
    .from("chat_sessions")
    .select(`
      *,
      chat_messages(count)
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }

  const sessions =
    data?.map((session) => ({
      ...session,
      message_count: session.chat_messages?.[0]?.count ?? 0,
    })) ?? [];

  return NextResponse.json(sessions);
}