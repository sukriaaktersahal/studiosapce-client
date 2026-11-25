// footer page
"use client";

import Link from "next/link";
import { Camera } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

// footer function
export default function Footer(){
  return(
    <footer className = "bg-gray-50 dark:bg-gray-950 border-t dark:border-gray-800 transition-colors duration-300">
      <div className = "container mx-auto px-4 py-12">
        <div className = "grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* logo , statement*/}
          <div className = "space-y-4">

            <Link href = "/" className = "flex items-center gap-2">
              <Camera className = "h-6 w-6 text-black dark:text-white"/>
              <span className = "font-bold text-xl tracking-tight dark:text-white">StudioSpace</span>
            </Link>

            <p className = "text-sm text-gray-500 dark:text-gray-400">
              Discover and book the perfect creative workspace for your next big project. Empowering creators and hosts worldwide.
            </p>

            {/* social link(X logo)*/}
            <div className = "flex gap-4">
              <Link href = "https://x.com" target ="_blank" className = "text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                <svg xmlns = "http://www.w3.org/2000/svg"
                     viewBox ="0 0 24 24"
                     fill = "currentColor"
                     className = "h-5 w-5">
                    
                    <path d = "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.094H5.053z"/>

                </svg>
              </Link>
            </div>
          </div>

          {/* quick link */}
          <div>
            <h3 className = "font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className = "space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href = "/" className = "hover:text-black dark:hover:text-white transition-colors">Home</Link></li>
              <li><Link href ="/studios" className = "hover:text-black dark:hover:text-white transition-colors">Explore Studios</Link></li>
              <li><Link href= "/how-it-works" className ="hover:text-black dark:hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href ="/about" className= "hover:text-black dark:hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* popular category*/}
          <div>
            <h3 className = "font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className = "space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/studios?category=Photo%20Studio" className = "hover:text-black dark:hover:text-white transition-colors">Photo Studios</Link></li>
              <li><Link href="/studios?category=Film%20Stage" className = "hover:text-black dark:hover:text-white transition-colors">Sound Stages</Link></li>
              <li><Link href="/studios?category=Podcast%20Lounge" className = "hover:text-black dark:hover:text-white transition-colors">Podcast Rooms</Link></li>
              <li><Link href="/studios?category=Music%20Suite" className = "hover:text-black dark:hover:text-white transition-colors">Music Suites</Link></li>
            </ul>
          </div>

          {/* newslatter input */}
          <div>
            <h3 className = "font-semibold text-gray-900 dark:text-white mb-4">Newsletter</h3>
            <p className = "text-sm text-gray-500 dark:text-gray-400 mb-3">Subscribe to get the latest updates and offers.</p>
            <form className = "flex flex-col gap-2" 
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Subscribed successfully!"); 
            }}>
              <Input type = "email"
                     placeholder = "Enter your email"
                     className = "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                     required/>
                
              <Button type = "submit" className = "w-full">Subscribe</Button>
            </form>
          </div>

        </div>

        {/* copywright with terms */}
        <div className = "border-t dark:border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} StudioSpace. All rights reserved.</p>
          <div className = "flex gap-4 mt-4 md:mt-0">
            <Link href ="/terms" className ="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link>
            <Link href ="/privacy" className = "hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}