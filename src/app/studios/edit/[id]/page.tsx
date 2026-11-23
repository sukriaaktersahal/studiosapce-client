// studios edit id page
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// edit studio page component
export default function EditStudioPage(){
  const params = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    amenities: "",
    detailedOverview: "",
  });

  // fetch studio data for editing
  useEffect(()=> {
    const fetchStudio = async () =>{
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/studios/${params.id}`);
        const data = await res.json();
        
        // convert amenities array to string for input
        setFormData({
          ...data,
          hourlyRate: data.hourlyRate.toString(),
          securityDeposit: data.securityDeposit.toString(),
          maxCapacity: data.maxCapacity.toString(),
          amenities: data.amenities?.join(", ") || "",
        });
      }catch{
        toast.error("Failed to load studio data");
      }finally{
        setLoading(false);
      }
    };
    if(params.id) fetchStudio();
  }, [params.id]);

  // submit update handler
  const handleSubmit = async (e: React.FormEvent)=> {
    e.preventDefault();
    setUpdating(true);

    try{
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth-token`, { credentials: "include" });

      const payload ={
        ...formData,
        hourlyRate: Number(formData.hourlyRate),
        securityDeposit: Number(formData.securityDeposit),
        maxCapacity: Number(formData.maxCapacity),
        amenities: formData.amenities.split(",").map((a) => a.trim()),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/studios/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if(res.ok){
        toast.success("Studio updated successfully!");
        router.push("/my-listings");
      }else{
        toast.error("Failed to update studio");
      }
    }catch{
      toast.error("Something went wrong");
    }finally{
      setUpdating(false);
    }
  };

  if(isPending || loading) return <div className = "text-center py-20">Loading...</div>;
  if(!session){
    router.push("/login");
    return null;
  }

  return(
    <div className = "container mx-auto py-10 px-4 max-w-2xl">
      <h1 className = "text-3xl font-bold mb-6">Edit Studio</h1>
      
      <form onSubmit = {handleSubmit} className = "space-y-5 bg-white p-8 rounded-xl shadow-sm border">
        <div>
          <Label>Studio Title</Label>
          <Input required value = {formData.title} onChange = {(e)=> setFormData({...formData, title: e.target.value})}/>
        </div>

        <div>
          <Label>Category</Label>
          <select 
            className = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value = {formData.category} 
            onChange = {(e)=> setFormData({...formData, category: e.target.value})}>
            <option>Photo Studio</option>
            <option>Film Stage</option>
            <option>Podcast Lounge</option>
            <option>Music Suite</option>
            <option>Workshop</option>
          </select>
        </div>

        <div className = "grid grid-cols-2 gap-4">
          <div>
            <Label>Hourly Rate ($)</Label>
            <Input type = "number" required value = {formData.hourlyRate} onChange = {(e)=> setFormData({...formData, hourlyRate: e.target.value})}/>
          </div>
          <div>
            <Label>Security Deposit ($)</Label>
            <Input type = "number" required value = {formData.securityDeposit} onChange = {(e)=> setFormData({...formData, securityDeposit: e.target.value})}/>
          </div>
        </div>

        <div className = "grid grid-cols-2 gap-4">
          <div>
            <Label>Max Capacity (People)</Label>
            <Input type = "number" required value = {formData.maxCapacity} onChange = {(e)=> setFormData({...formData, maxCapacity: e.target.value})}/>
          </div>
          <div>
            <Label>Location / Address</Label>
            <Input required value = {formData.location} onChange = {(e)=> setFormData({...formData, location: e.target.value})}/>
          </div>
        </div>

        <div>
          <Label>Amenities (Comma separated)</Label>
          <Input required value = {formData.amenities} onChange = {(e)=> setFormData({...formData, amenities: e.target.value})}/>
        </div>

        <div>
          <Label>Detailed Overview</Label>
          <Textarea required rows = {4} value = {formData.detailedOverview} onChange = {(e) => setFormData({...formData, detailedOverview: e.target.value})}/>
        </div>

        {/* read-only owner info */}
        <div className = "grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <Label>Owner Name</Label>
            <Input disabled value ={session.user.name}/>
          </div>
          <div>
            <Label>Owner Email</Label>
            <Input disabled value= {session.user.email}/>
          </div>
        </div>

        <Button type = "submit" className = "w-full" disabled={updating}>
          {updating ? "Updating..." : "Update Studio"}
        </Button>
      </form>
    </div>
  );
}