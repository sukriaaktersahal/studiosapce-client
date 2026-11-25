// layout .tsx file for the root layout of the application
import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/shared/Footer"; 

// Inter font for latin characters
const inter = Inter({ subsets: ["latin"] });

// browser tab for title, description 
export const metadata: Metadata ={
  title: "StudioSpace - Creative Workspace Marketplace",
  description: "Discover and book creative studio spaces",
};

// root layout
export default function RootLayout({ children, }: {children:React.ReactNode;
}){
  return(
    <html lang ="en" suppressHydrationWarning> 
      <body className = {inter.className}>
        <ThemeProvider attribute = "class" defaultTheme = "system" enableSystem >
        <Navbar />
        <main className = "min-h-screen flex flex-col">
          <div className= "flex-grow">
            {children}
          </div>
          <Footer/>
          </main>
        <Toaster position = "top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
