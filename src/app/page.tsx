// client home page
import Link from "next/link";
import { Button } from "@/components/ui/button";

// homepage function
export default function HomePage(){
  return(
    <main className = "min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className = "text-5xl font-extrabold text-gray-900 mb-4">Welcome to StudioSpace</h1>
      <p className ="text-lg text-gray-600 mb-8 max-w-2xl">
        Discover and book creative studio spaces for your next big project. 
        Whether you need a photo studio, sound stage, or podcast room, we have got you covered.
      </p>
      <div className = "flex gap-4">
        <Link href ="/studios">
          <Button size = "lg">Explore Studios</Button>
        </Link>
        <Link href ="/login">
          <Button size ="lg" variant = "outline">Login</Button>
        </Link>
      </div>
    </main>
  );
}