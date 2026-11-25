// add-studio page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession, authClient } from "@/lib/auth-client";

// addStusioPage function
export default function AddStudioPage(){
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // form data state
  const [formData, setFormData] = useState({
    title: "",
    category: "Photo Studio",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    amenities: "",
    detailedOverview: "",
  });

  // page access control
  if (isPending) return <div className = "text-center py-20">Loading...</div>;
  if (!session){
    router.push("/login");
    return null;
  }

  // image upload function(ImgBB)
  const uploadImage = async () =>{
    if (!imageFile) return null;
    const formData = new FormData();
    formData.append("image", imageFile);
    
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,{
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.data.url; 
  };

  // form submission handler
  const handleSubmit = async (e: React.FormEvent)=> {
    e.preventDefault();
    setLoading(true);

    try{
      // image upload
      const imageUrl = await uploadImage();
      if(!imageUrl){
        toast.error("Please upload an image");
        setLoading(false);
        return;
      }

      // sending data to server
      const payload ={
        ...formData,
        hourlyRate: Number(formData.hourlyRate),
        securityDeposit: Number(formData.securityDeposit),
        maxCapacity: Number(formData.maxCapacity),
        amenities: formData.amenities.split(",").map((a) => a.trim()),
        image: imageUrl,
        ownerEmail: session.user.email,
        ownerName: session.user.name,
        // default rating for new studios
        rating: 5.0,   
      };

      // fetch JWT token from server
     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth-token`, {
        credentials: "include",
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/studios`,{
        method: "POST",
        headers: { "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        // JWT token is to sent cookies
        credentials: "include",
      });

      if(res.ok){
        toast.success("Studio added successfully!");
        router.push("/my-listings");
      }else{
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to add studio");
      }
    }catch (err){
      toast.error("Something went wrong");
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className = "container mx-auto py-10 px-4 max-w-2xl">
      <h1 className = "text-3xl font-bold mb-6">Add New Studio</h1>
      
      <form onSubmit = {handleSubmit} className = "space-y-5 bg-white p-8 rounded-xl shadow-sm border">
        
        {/* title */}
        <div>
          <Label>Studio Title</Label>
          <Input required value = {formData.title} onChange = {(e)=> setFormData({...formData, title: e.target.value})} placeholder="e.g., Golden Hour Photo Studio"/>
        </div>

        {/* category */}
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

        {/* rates & capacity */}
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
            <Input required value = {formData.location} onChange = {(e) => setFormData({...formData, location: e.target.value})}/>
          </div>
        </div>

        {/* image upload */}
        <div>
          <Label>Studio Image</Label>
          <Input type = "file" accept = "image/*" required onChange = {(e) => setImageFile(e.target.files?.[0] || null)}/>
          <p className ="text-xs text-gray-500 mt-1">Upload a cover image for your studio.</p>
        </div>

        {/* amenities */}
        <div>
          <Label>Amenities (Comma separated)</Label>
          <Input required value ={formData.amenities} onChange={(e) => setFormData({...formData, amenities: e.target.value})} placeholder="WiFi, Lighting, Sound System"/>
        </div>

        {/* overview */}
        <div>
          <Label>Detailed Overview</Label>
          <Textarea required rows ={4} value = {formData.detailedOverview} onChange = {(e) => setFormData({...formData, detailedOverview: e.target.value})} placeholder="Describe your studio..."/>
        </div>

        {/* read-only user info */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <Label>Owner Name</Label>
            <Input disabled value = {session.user.name} />
          </div>

          <div>
            <Label>Owner Email</Label>
            <Input disabled value = {session.user.email} />
          </div>
        </div>

        <Button type = "submit" className = "w-full" disabled = {loading}>
          {loading ? "Adding Studio..." : "Add Studio"}
        </Button>
      </form>
    </div>
  );
}