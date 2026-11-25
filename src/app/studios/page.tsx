// studio page.tsx file
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Search } from "lucide-react";
import { toast } from "sonner";

// studio type
interface Studio{
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  rating: number;
  image: string;
}

// category list
const categories = ["All", "Photo Studio", "Film Stage", "Podcast Lounge", "Music Suite", "Workshop"];

// explore studios page function
export default function ExploreStudiosPage(){
  const [studios, setStudios] = useState<Studio[]>([]);
  const [filteredStudios, setFilteredStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // fetch studios from the database
  useEffect(() =>{
    const fetchStudios = async ()=>{
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/studios`);
        const data = await res.json();
        setStudios(data);
        setFilteredStudios(data);
      }catch{
        toast.error("Failed to load studios");
      }finally{
        setLoading(false);
      }
    };
    fetchStudios();
  }, []);

  // filter & search logic
  useEffect(()=> {
    let result: Studio[] = studios;

    // category filter
    if(selectedCategory !== "All"){
      result = result.filter((studio) => studio.category === selectedCategory);
    }

    // search query
    if(searchQuery){
      result = result.filter((studio)=>
        studio.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStudios(result);
  }, [selectedCategory, searchQuery, studios]);

  return(
    <div className = "container mx-auto py-10 px-4">
      <div className = "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className = "text-3xl font-bold text-gray-900 dark:text-white">Explore Studios</h1>
          <p className = "text-gray-500 dark:text-gray-400 mt-2">Find the perfect space for your creative project.</p>
        </div>

        {/* search bar */}
        <div className = "relative w-full md:w-72">
          <Search className = "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type = "text"
            placeholder = "Search studios..."
            className = "w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-transparent dark:text-white dark:border-gray-700"
            value = {searchQuery}
            onChange = {(e)=> setSearchQuery(e.target.value)}/>
        </div>
      </div>

      {/* catogery filter */}
      <div className ="flex flex-wrap gap-2 mb-8">
        {categories.map((cat)=>(
          <Button
            key = {cat}
            variant = {selectedCategory === cat ? "default" : "outline"}
            size = "sm"
            onClick ={()=> setSelectedCategory(cat)}>
            {cat}
          </Button>
        ))}
      </div>

      {/* studios grid */}
      {loading ? (
        <div className = "text-center py-20 dark:text-white">Loading studios...</div>
      ) : filteredStudios.length === 0 ? (
        <div className = "text-center py-20 ">
          <h3 className = "text-xl font-semibold mb-2 dark:text-white">No studios found</h3>
          <p className = "text-gray-500 dark:text-gray-400">Try changing your search or category filter.</p>
        </div>
      ) : (
        <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudios.map((studio)=> (
            <Card key = {studio._id} className = "overflow-hidden hover:shadow-lg transition-shadow">
              <div className = "relative h-48 w-full">
                {/* normal image tag */}
                <img src = {studio.image} alt ={studio.title} className = "w-full h-full object-cover"/>
                <Badge className = "absolute top-4 left-4 bg-white text-black hover:bg-gray-100">
                  {studio.category}
                </Badge>
                <Badge className = "absolute top-4 right-4 bg-yellow-400 text-black hover:bg-yellow-500 flex items-center gap-1">
                  <Star className = "h-3 w-3 fill-black" /> {studio.rating || 5.0}
                </Badge>
              </div>
              <CardContent className = "p-5">
                <h3 className = "text-xl font-bold text-gray-900 dark:text-white mb-2">{studio.title}</h3>
                <div className = "flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                  <MapPin className = "h-4 w-4 mr-1" /> {studio.location}
                </div>
                <div className= "flex items-center justify-between mt-auto">
                  <div className ="text-2xl font-bold text-gray-900 dark:text-white">
                    ${studio.hourlyRate} <span className ="text-sm font-normal text-gray-500 dark:text-gray-400">/ hr</span>
                  </div>
                  <Link href ={`/studios/${studio._id}`}>
                    <Button size ="sm" variant ="outline">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}