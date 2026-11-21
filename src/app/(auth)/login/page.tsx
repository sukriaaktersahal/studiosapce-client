// login page
"use client"; 
import { useState } from "react"; 
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";
import {toast} from "sonner"; 
import { Button } from "@/components/ui/button"; 
import {Input} from "@/components/ui/input"; 
import {Label} from "@/components/ui/label"; 
import Link from "next/link"; 

// default login page function
export default function LoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

//   handling login function
  const handleLogin = async (e: React.FormEvent) =>{
    e.preventDefault(); 
    setLoading(true); 

    // check email, password with help of BetterAuth
    try{
      const { error } = await authClient.signIn.email({email, password});
      
      if(error){
        toast.error(error.message || "Login failed");
      }else{
        toast.success("Welcome back to StudioSpace!");
        router.push("/");
        router.refresh(); 
      }
    }catch{
      toast.error("Something went wrong. Please try again.");
    }finally{
      setLoading(false); 
    }
  };

  return(
    <div className = "min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-200 px-4">
      <div className ="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        {/* heading */}
        <h1 className= "text-3xl font-bold text-center mb-2">Welcome Back</h1>
        {/* subtitle */}
        <p className= "text-center text-gray-500 mb-6">Login to your StudioSpace account</p>

        {/* login form */}
        <form onSubmit = {handleLogin} className ="space-y-4">
          <div>
            <Label htmlFor = "email">Email</Label>
            
            <Input id ="email"
                   type ="email"
                   placeholder= "you@example.com"
                   value= {email}
                   onChange ={(e)=> setEmail(e.target.value)} 
                   required/>
          </div>
          <div>
            <Label htmlFor= "password">Password</Label>
             <Input id ="password"
                    type ="password"
                    placeholder= "••••••"
                    value ={password}
                    onChange ={(e)=> setPassword(e.target.value)}
                    required/>
          </div>
          {/* submit button become disable when loading */}
          <Button type ="submit" className ="w-full" disabled = {loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* registration page linkk */}
        <p className = "mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href = "/register" className ="text-blue-600 font-medium hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}