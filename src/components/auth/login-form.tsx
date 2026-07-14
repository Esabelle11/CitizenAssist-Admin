"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";


export default function LoginForm(){

  const router = useRouter();
  const supabase = createClient();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");


  async function handleLogin() {
    setError("");
  
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      setError(error.message);
      return;
    }
  
    const user = data.user;
  
    if (user) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          last_login: new Date().toISOString(),
        })
        .eq("id", user.id);
  
      if (updateError) {
        console.error("Failed to update last login:", updateError.message);
      }
    }
  
    router.push("/dashboard");
  }



  return (

    <div className="w-96 space-y-4">

      <h1 className="text-2xl">
        CitizenAssist Admin
      </h1>


      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={
          e=>setEmail(e.target.value)
        }
      />


      <input
        className="border p-2 w-full"
        placeholder="Password"
        type="password"
        value={password}
        onChange={
          e=>setPassword(e.target.value)
        }
      />


      {
        error &&
        <p className="text-red-500">
          {error}
        </p>
      }


      <button
        className="bg-black text-white p-2 w-full"
        onClick={handleLogin}
      >
        Login
      </button>


    </div>

  );

}