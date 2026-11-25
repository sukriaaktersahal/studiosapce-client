// not found page(404)
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

// notFound function
export default function NotFound(){
  return(
    <div className = "min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 text-center">
      <div className = "mb-8">
        <Camera className = "h-24 w-24 text-gray-400 mx-auto"/>
      </div>
      <h1 className = "text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <h2 className = "text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Oops! Page Not Found</h2>
      <p className = "text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href = "/">
        <Button size = "lg" className = "gap-2">Return to Home</Button>
      </Link>
    </div>
  );
}