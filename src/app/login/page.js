"use client";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// setCookie('key', 'value', options);

export default function Login() {
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = () => {
        if (password === "admin") {
          document.cookie = "userAuthenticated=true; path=/";
    
          router.push("/");
        } else {
          console.log("Contraseña incorrecta");
        }
      };
    

    useEffect(()=>{
        setCookie("userAuthenticated", "false", null);

    },[])


  return (
    <div className="flex justify-center items-center h-screen rossColor">
      <div className="w-full h-full flex flex-col">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white p-2 rounded-full mt-2">
            <img
              src="../favicon.ico"
              alt="Logo"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <h1 className="text-4xl font-bold text-center text-white">Login</h1>
        </div>
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
    </div>
  );
}

