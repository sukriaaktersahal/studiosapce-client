import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang="en">
      <body className={inter.className}>{children}
        <Toaster position = "top-right" richColors />
      </body>
    </html>
  );
}
