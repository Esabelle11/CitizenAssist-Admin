import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateEmbedding } from "@/lib/embedding"; // Import your new helper!

interface UpdateRequestBody {
  id?: number;
  category: string;
  name: string;
  search_summary: string;
  content: string;
  is_active?: boolean;
}

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
    .from("information_base")
    .select("id, category, name, search_summary, content, is_active, updated_at")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}




export async function POST(request: Request) {
  try {
    const data: UpdateRequestBody = await request.json();
    const { id, category, name, search_summary, content, is_active } = data;

    // 1. Validation check
    if (!category || !name || !search_summary || !content) {
      return NextResponse.json(
        { error: "Missing required fields: category, name, search_summary, and content must be provided." },
        { status: 400 }
      );
    }
   
    // 2. Generate the embedding using your new clean helper
    let embeddingVector: number[];
    try {
      embeddingVector = await generateEmbedding(search_summary);
      // console.log("[embeddingVector]: ", embeddingVector)
    } catch (embedError: any) {
      return NextResponse.json(
        { error: embedError.message || "Failed to generate vector embedding" },
        { status: 502 }
      );
    }

    // 3. Prepare payload for Supabase matching your schema
    const payload: any = {
      category,
      name,
      search_summary,
      summary_embedding: embeddingVector, 
      content,
    };

    if (is_active !== undefined) payload.is_active = is_active;

    const supabase = await createClient();
    const {data: { user },} = await supabase.auth.getUser();
  
    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 4. Perform Upsert to Supabase
    const { data: insertedData, error } = await supabase
      .from('information_base')
      .insert(payload)
      .select();

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.json(
        { message: error.message},
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Information base successfully updated.",
        data: insertedData,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error in updateInformationBase API:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected internal server error occurred." },
      { status: 500 }
    );
  }
}



