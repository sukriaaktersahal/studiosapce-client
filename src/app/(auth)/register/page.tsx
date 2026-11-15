// client register page
"use client"; 
import { useState } from "react";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

// default register page function
export default function RegisterPage(){
  const [form, setForm] = useState({
    name : "",
    email : "",
    photoUrl : "",
    password : "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // password validation function
  const validatePassword = (pwd: string) =>{
    if(pwd.length < 6) return "Password must be at least 6 characters";
    if(!/[A-Z]/.test(pwd)) return "Password must contain an uppercase letter";
    if(!/[a-z]/.test(pwd)) return "Password must contain a lowercase letter";
    return null; 
  };
// handling register function
  const handleRegister = async (e: React.FormEvent) =>{
    e.preventDefault();

    // checing password validation
    const pwdError = validatePassword(form.password);
    if(pwdError){
      toast.error(pwdError);
      return;
    }
    setLoading(true);
    // creating new user with help of BetterAuth
    try{
      const { error } = await authClient.signUp.email({
        name : form.name,
        email : form.email,
        password : form.password,
        image : form.photoUrl || undefined, 
      });
      
      if(error){
        toast.error(error.message || "Registration failed");
      }else{
        toast.success("Account created! Please login.");
        router.push("/login");
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
        <h1 className ="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className= "text-center text-gray-500 mb-6">Join StudioSpace to host or book studios</p>

        <form onSubmit ={handleRegister} className ="space-y-4">
          <div>
            <Label htmlFor = "name">Full Name</Label>
             <Input id= "name"
                    placeholder = "John Doe"
                    value = {form.name}
                    onChange = {(e)=> setForm({...form, name: e.target.value})}
                    required/>
          </div>
          <div>
            <Label htmlFor ="email">Email</Label>
            <Input  id ="email"
                    type ="email"
                    placeholder ="you@example.com"
                    value = {form.email}
                    onChange = {(e)=> setForm({...form, email: e.target.value})}
                    required/>
          </div>
          <div>
            <Label htmlFor ="photoUrl">Photo URL</Label>
                <Input id = "photoUrl"
                        placeholder ="https://example.com/photo.jpg"
                        value= {form.photoUrl}
                        onChange ={(e)=> setForm({...form, photoUrl: e.target.value})}/>
          </div>
          <div>
            <Label htmlFor = "password">Password</Label>
             <Input id ="password"
                    type ="password"
                    placeholder = "Min 6 chars, 1 uppercase, 1 lowercase"
                    value = {form.password}
                    onChange = {(e)=> setForm({...form, password: e.target.value})}
                    required/>
          </div>
          <Button type = "submit" className = "w-full" disabled = {loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className = "mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href = "/login" className = "text-blue-600 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}