 // client home page
"use client";
import { useState, useEffect } from "react"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Camera, Music, Mic, Film, Palette, ArrowRight } from "lucide-react";

// swiper component & styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// studio interface
interface Studio{
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  rating: number;
  image: string;
}
// demo data
const featuredStudios = [
  { id: "1", title : "Golden Hour Photo Studio", category: "Photo Studio", rate: 45, rating: 4.8, location: "Mirpur, Dhaka", image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500"},
  { id: "2", title : "Studio A Sound Stage", category: "Film Stage", rate: 120, rating: 4.9, location: "Gulshan, Dhaka", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500"},
  { id: "3", title : "The Podcast Lounge", category: "Podcast Room", rate: 30, rating: 4.7, location: "Dhanmondi, Dhaka", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500"},
  { id: "4", title : "Harmony Music Suite", category: "Music Suite", rate: 60, rating: 4.6, location: "Banani, Dhaka", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500"},
  { id: "5", title : "Creative Art Workshop", category: "Workshop", rate: 25, rating: 4.5, location: "Uttara, Dhaka", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500"},
  { id: "6", title : "White Cyc Studio", category: "Photo Studio", rate: 55, rating: 4.9, location: "Bashundhara, Dhaka", image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500"},
];

// category data
const categories = [
  { name: "Photo Studios", icon: Camera, color: "bg-blue-100 text-blue-600"},
  { name: "Sound Stages", icon: Film, color: "bg-purple-100 text-purple-600"},
  { name: "Podcast Rooms", icon: Mic, color: "bg-green-100 text-green-600"},
  { name: "Music Suites", icon: Music, color: "bg-orange-100 text-orange-600"},
  { name: "Art Workshops", icon: Palette, color: "bg-pink-100 text-pink-600"},
];

// homepage function
export default function HomePage(){
  // state
  const [featuredStudios, setFeaturedStudios] = useState<Studio[]>([]);

  // fetch data
  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/studios?limit=6`)
    .then(res => res.json())
    .then(data => setFeaturedStudios(data))
    .catch(err => console.error(err));
  }, []);

  // slider data
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1600&h=800&fit=crop",
      title: "Find Your Perfect Creative Space",
      subtitle: "Book top-rated photo studios, sound stages, and more with transparent pricing.",
    },
    {
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&h=800&fit=crop",
      title: "Where Ideas Come to Life",
      subtitle: "Access professional equipment and acoustics for your next big production.",
    },
    {
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&h=800&fit=crop",
      title: "Host Your Space, Earn More",
      subtitle: "Join thousands of hosts and turn your creative space into a profitable asset.",
    },
  ];

  return(
    <div className ="flex flex-col min-h-screen dark:bg-gray-950 transition-colors duration-300">

      {/* hero section */}
            <section className = "w-full h-[500px] md:h-[600px]">
             <Swiper  modules = {[Autoplay, Pagination, Navigation]}
                      autoplay = {{ delay: 4000, disableOnInteraction: false }}
                      pagination = {{ clickable: true }}
                      loop = {true}
                      className = "h-full w-full">
                      {slides.map((slide, index) =>(
                        <SwiperSlide key={index}>
                          <div className ="relative w-full h-full flex items-center justify-center bg-cover bg-center"
                                style = {{ backgroundImage: `url(${slide.image})` }}>

                                  {/* black overlay */}
                                  <div className = "absolute inset-0 bg-black/50"/>

                                  {/* slider content */}
                                  <div className ="relative z-10 text-center px-4 max-w-3xl">
                                    <h1 className ="text-4xl md:text-6xl font-bold text-white mb-4">{slide.title}</h1>
                                    <p className = "text-lg md:text-xl text-gray-200 mb-8">{slide.subtitle}</p>
                                    <div className = "flex flex-wrap items-center justify-center gap-4">

                                      <Link href = "/studios">
                                        <Button size = "lg" className = "bg-white text-black hover:bg-gray-200">Explore Studios</Button>
                                      </Link>

                                      <Link href = "/add-studio">
                                        <Button size = "lg" variant = "outline" className = "text-white border-white hover:bg-white/20">Host Your Space</Button>
                                      </Link>

                                    </div>
                                  </div>
                                </div>
                        </SwiperSlide>
                ))}
              </Swiper>
            </section>

            {/* featured studio section */}
            <section className = "py-16 container mx-auto px-4">
              <div className = "flex items-center justify-between mb-8">
                <div>
                  <h2 className = "text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Studios</h2>
                  <p className ="text-gray-500 dark:text-gray-400 mt-2">Discover top-rated creative spaces for your next shoot.</p>
                </div>
                <Link href ="/studios" className= "text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
                  View All <ArrowRight className= "h-4 w-4" />
                </Link>
              </div>

              {/* grid */}
              <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{featuredStudios.map((studio: Studio)=>(
                  <Card key={studio._id} className = "overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-800">

                    <div className = "relative h-48 w-full">
                      <img src = {studio.image} alt = {studio.title} className = "w-full h-full object-cover"/>
                      <Badge className ="absolute top-4 left-4 bg-white text-black hover:bg-gray-100">{studio.category}</Badge>
                      <Badge className ="absolute top-4 right-4 bg-yellow-400 text-black hover:bg-yellow-500 flex items-center gap-1">
                        <Star className = "h-3 w-3 fill-black"/> {studio.rating || 5.0}
                      </Badge>
                    </div>

                    <CardContent className = "p-5">
                      <h3 className = "text-xl font-bold text-gray-900 dark:text-white mb-2">{studio.title}</h3>
                      <div className = "flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4"><MapPin className = "h-4 w-4 mr-1"/> {studio.location}</div>
                      <div className ="flex items-center justify-between mt-auto">
                        <div className = "text-2xl font-bold text-gray-900 dark:text-white">${studio.hourlyRate} <span className = "text-sm font-normal text-gray-500">/ hr</span></div>
                        <Link href = {`/studios/${studio._id}`}>
                          <Button size = "sm" variant = "outline" className = "dark:border-gray-700 dark:text-gray-300">View Details</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* browse by category  */}
            <section className = "py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <div className = "container mx-auto px-4 text-center">
                <h2 className = "text-3xl font-bold text-gray-900 dark:text-white mb-4">Browse by Category</h2>
                <p className = "text-gray-500 dark:text-gray-400 mb-10">Find the perfect space based on what you need.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                  {categories.map((cat, index) =>{
                    const Icon = cat.icon;
                    return(
                      <Link key = {index} href = {`/studios?category=${encodeURIComponent(cat.name)}`}>
                        <div className = "flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
                          <div className = {`p-4 rounded-full ${cat.color} mb-4`}>
                            <Icon className = "h-8 w-8"/>
                          </div>
                          <span className = "font-medium text-gray-900 dark:text-white text-sm md:text-base text-center">{cat.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* booking woring process */}
            <section className = "py-16 container mx-auto px-4 text-center">
              <h2 className = "text-3xl font-bold text-gray-900 dark:text-white mb-4">How Booking Works</h2>
              <p className = "text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">From discovering the right space to wrapping up your shoot, we make the process seamless.</p>
              
              <div className = "grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: "1", title: "Discover Spaces", desc: "Browse our curated list of creative studios." },
                  { step: "2", title: "Select Shoot Hours", desc: "Choose your desired date and time slots." },
                  { step: "3", title: "Book Instantly", desc: "Secure your space with a simple booking flow." },
                  { step: "4", title: "Create & Produce", desc: "Show up and bring your creative vision to life." },
                ].map((item)=> (
                  <div key ={item.step} className = "flex flex-col items-center">
                    <div className = "w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-2xl font-bold mb-4 transition-colors duration-300">
                      {item.step}
                    </div>
                    <h3 className = "text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className = "text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* host guarantee section */}
            <section className = "py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <div className = "container mx-auto px-4 text-center">
                <h2 className = "text-3xl font-bold text-gray-900 dark:text-white mb-4">Host Guarantee & Creator Support</h2>
                <p className = "text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                  We ensure a safe and seamless experience for both hosts and creators.
                </p>
                
                <div className = "grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                  <div className = "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                    <h3 className = "font-semibold text-lg mb-2 dark:text-white">Liability Protection</h3>
                    <p className = "text-sm text-gray-500 dark:text-gray-400">Comprehensive coverage for peace of mind.</p>
                  </div>
                  <div className = "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                    <h3 className = "font-semibold text-lg mb-2 dark:text-white">Verified Profiles</h3>
                    <p className = "text-sm text-gray-500 dark:text-gray-400">Every user is authenticated and verified.</p>
                  </div>
                  <div className ="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                    <h3 className ="font-semibold text-lg mb-2 dark:text-white">Equipment Safety</h3>
                    <p className= "text-sm text-gray-500 dark:text-gray-400">Your gear is safe in our curated spaces.</p>
                  </div>
                  <div className ="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                    <h3 className= "font-semibold text-lg mb-2 dark:text-white">24/7 Support</h3>
                    <p className= "text-sm text-gray-500 dark:text-gray-400">Dedicated host and creator support team.</p>
                  </div>
                </div>
              </div>
            </section>

    </div>
  );
}