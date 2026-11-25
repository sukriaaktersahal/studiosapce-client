// my bookings page
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

// booking interface
interface Booking{
  _id: string;
  studioId: string;
  userEmail: string;
  startTime: string;
  endTime: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

// My Bookings Page component
export default function MyBookingsPage(){
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch bookings
  useEffect(()=> {
    if(!session) return; 

    const fetchBookings = async () =>{
      try{
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth-token`, { credentials: "include" });

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my-bookings`, {
          credentials: "include",
        });
        const data = await res.json();
        setBookings(data);
      }catch{
        toast.error("Failed to load bookings");
      }finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]); 

  // page access blocking 
  if(isPending) return <div className = "text-center py-20">Loading...</div>;
  if(!session){
    router.push("/login");
    return null;
  }

  // booking cancellation
  const handleCancel = async (id: string)=> {
    if(!confirm("Are you sure you want to cancel this booking?")) return;

    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}/cancel`, {
        method: "PUT",
        credentials: "include",
      });

      if(res.ok){
        toast.success("Booking cancelled");
        setBookings(bookings.map((b)=> (b._id === id ? { ...b, status: "Cancelled" } : b)));
      }else{
        toast.error("Failed to cancel booking");
      }
    }catch{
      toast.error("Something went wrong");
    }
  };

  // status badge
  const getStatusBadge = (status: string)=>{
    switch (status) {
      case "Pending": return <Badge className = "bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case "Confirmed": return <Badge className = "bg-green-500 hover:bg-green-600">Confirmed</Badge>;
      case "Completed": return <Badge className = "bg-blue-500 hover:bg-blue-600">Completed</Badge>;
      case "Cancelled": return <Badge className = "bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return(
    <div className = "container mx-auto py-10 px-4">
      <h1 className = "text-3xl font-bold mb-8">My Bookings</h1>

      {loading ? (
        <div className = "text-center py-10">Loading your bookings...</div>
      ) : bookings.length === 0 ? (
        <div className = "text-center py-20 bg-gray-50 rounded-xl border">
          <h3 className = "text-xl font-semibold mb-2">No bookings yet</h3>
          <p className = "text-gray-500 mb-4">You haven&apos;t booked any studios.</p>
          <Link href = "/studios">
            <Button>Explore Studios</Button>
          </Link>
        </div>
      ) : (
        <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking)=>(
            <Card key = {booking._id} className = "overflow-hidden">
              <CardContent className = "p-6">
                <div className = "flex justify-between items-start mb-4">
                  <h3 className = "text-lg font-bold">Studio ID: {booking.studioId.slice(-6)}</h3>
                  {getStatusBadge(booking.status)}
                </div>
                
                <div className = "space-y-2 text-gray-600 text-sm mb-6">
                  <div className = "flex items-center gap-2">
                    <CalendarDays className = "h-4 w-4"/> 
                    Start: {new Date(booking.startTime).toLocaleString()}
                  </div>
                  <div className = "flex items-center gap-2">
                    <Clock className= "h-4 w-4" /> 
                    End: {new Date(booking.endTime).toLocaleString()}
                  </div>
                </div>

                {booking.status === "Pending" && (
                   
                  <Button variant = "destructive" 
                          className = "w-full" 
                          onClick= {()=> handleCancel(booking._id)}>
                          Cancel Booking
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}