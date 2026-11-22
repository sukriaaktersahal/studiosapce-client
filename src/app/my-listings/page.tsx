// my listing page
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image"; 

// studio type
interface Studio{
  _id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  ownerEmail: string;
}

// my listing page function
export default function MyListingsPage(){
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  // handle async function to fetch studios
  useEffect(()=> {
    if(isPending || !session) return;

    const fetchMyStudios = async () =>{
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/studios`);
        const allStudios: Studio[] = await res.json();
        
        const myStudios = allStudios.filter(
          (studio)=> studio.ownerEmail === session.user.email
        );
        setStudios(myStudios);
      }catch{
        toast.error("Failed to fetch studios");
      }finally{
        setLoading(false);
      }
    };

    fetchMyStudios();
  }, [session, isPending]);

  // block page access 
  if(isPending) return <div className = "text-center py-20">Loading...</div>;
  if(!session){
    router.push("/login");
    return null;
  }

  // delete studio function
  const handleDelete = async (id: string)=> {
    if(!confirm("Are you sure you want to delete this studio?")) return;

    try{
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth-token`, { credentials: "include" });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/studios/${id}`,{
        method: "DELETE",
        credentials: "include",
      });

      if(res.ok){
        toast.success("Studio deleted successfully");
        setStudios(studios.filter((s)=> s._id !== id));
      }else{
        toast.error("Failed to delete studio");
      }
    }catch{
      toast.error("Something went wrong");
    }
  };

  return(
    <div className = "container mx-auto py-10 px-4">
      <div className = "flex items-center justify-between mb-8">
        <h1 className = "text-3xl font-bold">My Studio Listings</h1>
        <Link href = "/add-studio">
          <Button>Add New Studio</Button>
        </Link>
      </div>

      {loading ?(
        <div className = "text-center py-10">Loading your studios...</div>
      ) : studios.length === 0 ? (
        <div className = "text-center py-20 bg-gray-50 rounded-xl border">
          <h3 className = "text-xl font-semibold mb-2">No studios found</h3>
          <p className = "text-gray-500 mb-4">You have not added any studios yet.</p>
          <Link href = "/add-studio">
            <Button>Add Your First Studio</Button>
          </Link>
        </div>
      ):(
        <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio)=> (
            <Card key = {studio._id} className = "overflow-hidden">
              <div className = "relative h-48 w-full bg-gray-200">
                {/* use of next.js image */}
                <Image
                  src = {studio.image}
                  alt = {studio.title}
                  fill 
                  className = "object-cover"/>
              </div>
              <CardContent className = "p-5">
                <div className = "flex justify-between items-start mb-2">
                  <h3 className = "text-xl font-bold">{studio.title}</h3>
                  <Badge>{studio.category}</Badge>
                </div>
                <p className = "text-gray-500 text-sm mb-4">{studio.location}</p>
                <div className = "flex items-center gap-2 mt-4">
                  <Link href = {`/studios/edit/${studio._id}`} className = "flex-1">
                    <Button variant = "outline" className ="w-full gap-2">
                      <Edit className = "h-4 w-4" /> Edit
                    </Button>
                  </Link>
                  <Button
                    variant = "destructive"
                    className = "flex-1 gap-2"
                    onClick={()=> handleDelete(studio._id)}
                  >
                    <Trash2 className = "h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}