"use client";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner';

// setCookie('key', 'value', options);

export default function Login() {
    const [password, setPassword] = useState("");
    const [inputType, setInputType] = useState("password");
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

    const handleChange = (e) => setPassword(e.target.value)

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          handleSubmit()
      }
    };

    const handleChangeInputType = (e) => {
      if (inputType === "password") setInputType("text")
      if (inputType === "text") setInputType("password")
    }

  return (
    <div className="flex flex-col rossColor gap-4">
      <Toaster position="top-right" richColors closeButton />
        <h1 className="text-4xl font-bold text-center text-white justify-self-start">Login</h1>
        <div className="flex flex-col items-center justify-center gap-2">
          <label className="relative">
          <input
            type={inputType}
            placeholder="Enter Password"
            className="border p-3 rounded-lg text-lg outline-none"
            value={password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            />
            <div 
              className="absolute top-5 right-2 cursor-pointer"
              onClick={handleChangeInputType}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3c1.641 0 3-1.358 3-3c0-1.641-1.359-3-3-3"/><path fill="currentColor" d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316l-.105-.316C21.927 11.617 19.633 5 12 5m0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5c-.504 1.158-2.578 5-7.926 5"/></svg>
            </div>
          </label>
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

