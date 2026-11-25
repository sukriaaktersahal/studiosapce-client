// navbar file for the navigation bar component
"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {authClient} from "@/lib/auth-client";
import {Button} from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, LogOut, PlusCircle, LayoutDashboard, List, CalendarDays } from "lucide-react";

// navbar function
export default function Navbar(){
  const pathname = usePathname(); 
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // nevigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
  ];

  return(
    // sticky header
    <header className = "sticky top-0 z-50 w-full border-b bg-white/90 dark:bg-gray-950/90 backdrop-blur "> 
      <div className = "container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* logo section */}
        <Link href = "/" className = "flex items-center gap-2">
          <Camera className= "h-6 w-6 text-black dark:text-white"/>
          <span className = "font-bold text-xl tracking-tight">StudioSpace</span>
        </Link>

        {/* middle navigation links */}
        <nav className = "hidden md:flex items-center gap-6">
          {navLinks.map((link) =>(
           <Link key = {link.name}
                 href = {link.href}
                 className = {`text-sm font-medium transition-colors hover:text-black dark:hover:text-white ${
                 pathname === link.href ? "text-black dark:text-white border-b-2 border-black" : "text-gray-500 dark:text-gray-400"}`}>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* right side actions */}
        <div className = "flex items-center gap-4">
          <ThemeToggle/>
          {isPending ?(
            <div className = "h-8 w-24 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
          ): user ? (
            // profile dropdown menu when user is logged in
            <DropdownMenu>
                <DropdownMenuTrigger className = "flex items-center gap-2 outline-none cursor-pointer">
                    <Avatar className ="h-9 w-9 border">
                        <AvatarImage src ={user.image || ""} alt ={user.name || "User"} />
                        <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>

              <DropdownMenuContent align = "end" className = "w-56">

                <div className = "flex flex-col space-y-1 p-2 border-b">
                  <p className = "text-sm font-medium leading-none">{user.name}</p>
                  <p className = "text-xs text-muted-foreground">{user.email}</p>
                </div>

                <DropdownMenuItem>

                  <Link href = "/dashboard" className = "cursor-pointer">
                    <LayoutDashboard className = "mr-2 h-4 w-4"/> Dashboard
                  </Link>

                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href = "/add-studio" className = "cursor-pointer">
                    <PlusCircle className = "mr-2 h-4 w-4"/> Add New Studio
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href = "/my-listings" className = "cursor-pointer">
                    <List className = "mr-2 h-4 w-4" /> My Studio Listings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href = "/my-bookings" className = "cursor-pointer">
                    <CalendarDays className = "mr-2 h-4 w-4" /> My Bookings
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem
                  className ="text-red-600 cursor-pointer"
                  onClick = {async ()=>{await authClient.signOut(); window.location.href = "/";}}>

                  <LogOut className = "mr-2 h-4 w-4"/> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ):(
            // login and register buttons when user is not logged in
            <div className = "flex items-center gap-2">
              <Link href = "/login">
                <Button variant = "ghost" size = "sm">Login</Button>
              </Link>
              <Link href = "/register">
                <Button size = "sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}