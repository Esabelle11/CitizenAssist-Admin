export async function POST(req: Request) {
  const formData = await req.formData();

  const res = await fetch(
    "https://citizen-assist-ai-chatbot.vercel.app/api/chat_test",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return Response.json(data);
}