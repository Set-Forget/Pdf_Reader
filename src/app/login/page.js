"use client";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner';

// setCookie('key', 'value', options);

export default function Login() {
    const [password, setPassword] = useState("");
    const router = useRouter();
    const USER_PASSWORD = "admin"

    const handleSubmit = () => {
        if (password === USER_PASSWORD) {
          document.cookie = "userAuthenticated=true; path=/";
    
          router.push("/");
        } else {
          console.log("Contraseña incorrecta");
          toast.error('Invalid password')
        }
      };
    

    useEffect(()=>{
        setCookie("userAuthenticated", "false", null);

    },[])


  return (
    <div className="flex flex-col rossColor">
      <Toaster position="top-right" richColors closeButton />
        <h1 className="text-4xl font-bold text-center text-white justify-self-start">Login</h1>
        <div className="flex flex-col items-center justify-center mt-10">
          <input
            type="password"
            placeholder="Enter Password"
            className="border p-3 rounded-lg mb-4 text-lg outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
    </div>
  );
}

