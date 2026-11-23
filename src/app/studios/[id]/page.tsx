// studios id page.tsx file
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Clock, Users, DollarSign, Calendar } from "lucide-react";

// studio interface
interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  rating: number;
  image: string;
  amenities: string[];
  detailedOverview: string;
  ownerName: string;
  ownerEmail: string;
}

// Studio details page component
export default function StudioDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  
  // booking modal state and form data
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  // fetch studio data
  useEffect(() =>{
    const fetchStudio = async ()=> {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/studios/${params.id}`);
        const data = await res.json();
        setStudio(data);
      }catch{
        toast.error("Failed to load studio");
      }finally{
        setLoading(false);
      }
    };
    fetchStudio();
  }, [params.id]);

  // booking submit handler
  const handleBooking = async (e: React.FormEvent)=> {
    e.preventDefault();
    if(!session){
      toast.error("Please login to book a studio");
      router.push("/login");
      return;
    }

    setBookingLoading(true);
    try{
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth-token`, { credentials: "include" });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studioId: studio?._id, startTime: startDate, endTime: endDate }),
        credentials: "include",
      });

      if(res.ok){
        toast.success("Booking request sent successfully!");
        setShowBookingModal(false);
        router.push("/my-bookings");
      }else{
        const err = await res.json();
        toast.error(err.error || "Failed to book");
      }
    }catch{
      toast.error("Something went wrong");
    }finally{
      setBookingLoading(false);
    }
  };

  if(loading) return <div className = "text-center py-20">Loading...</div>;
  if(!studio) return <div className = "text-center py-20">Studio not found</div>;

  return(
    <div className = "container mx-auto py-10 px-4 max-w-5xl">
      <div className = "grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* left side image */}
        <div>
          <img src = {studio.image} alt ={studio.title} className = "w-full h-96 object-cover rounded-xl shadow-lg" />
        </div>

        {/* right side information */}
        <div>
          <Badge className ="mb-4">{studio.category}</Badge>
          <h1 className ="text-4xl font-bold text-gray-900 mb-4">{studio.title}</h1>
          
          <div className= "flex items-center gap-4 text-gray-600 mb-6">
            <span className ="flex items-center gap-1"><MapPin className ="h-4 w-4" /> {studio.location}</span>
            <span className= "flex items-center gap-1"><Star className ="h-4 w-4 text-yellow-500 fill-yellow-500" /> {studio.rating || 5.0}</span>
          </div>

          <p className ="text-gray-600 mb-8">{studio.detailedOverview}</p>

          <div className ="grid grid-cols-2 gap-4 mb-8">
            <div className = "flex items-center gap-2 text-gray-700"><Users className = "h-5 w-5 text-blue-500" /> Max {studio.maxCapacity} People</div>
            <div className = "flex items-center gap-2 text-gray-700"><DollarSign className = "h-5 w-5 text-green-500" /> ${studio.hourlyRate} / hr</div>
            <div className = "flex items-center gap-2 text-gray-700"><Clock className= "h-5 w-5 text-orange-500" /> Deposit: ${studio.securityDeposit}</div>
          </div>

          <div className = "mb-8">
            <h3 className = "font-semibold mb-2">Amenities</h3>
            <div className = "flex flex-wrap gap-2">
              {studio.amenities.map((item, idx) =>(
                <Badge key = {idx} variant = "secondary">{item}</Badge>
              ))}
            </div>
          </div>

          <Button className = "w-full py-6 text-lg" onClick = {()=> setShowBookingModal(true)}>
            <Calendar className ="mr-2 h-5 w-5"/> Book Workspace Now
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className = "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className = "w-full max-w-md p-6">
            <h2 className ="text-2xl font-bold mb-4">Book {studio.title}</h2>
            <form onSubmit = {handleBooking} className = "space-y-4">
              <div>
                <label className = "block text-sm font-medium mb-1">Start Date & Time</label>
                <input type = "datetime-local" required className = "w-full border p-2 rounded" value = {startDate} onChange = {(e)=> setStartDate(e.target.value)}/>
              </div>
              <div>
                <label className = "block text-sm font-medium mb-1">End Date & Time</label>
                <input type = "datetime-local" required className = "w-full border p-2 rounded" value = {endDate} onChange = {(e)=> setEndDate(e.target.value)}/>
              </div>
              <div className = "flex gap-4 pt-4">
                <Button type = "button" variant = "outline" className = "flex-1" onClick = {()=> setShowBookingModal(false)}>Cancel</Button>
                <Button type = "submit" className = "flex-1" disabled = {bookingLoading}>{bookingLoading ? "Booking..." : "Confirm Booking"}</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}