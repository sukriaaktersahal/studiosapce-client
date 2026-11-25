# StudioSpace - Peer-to-Peer Creative Workspace Platform

**Live Site URL:** [https://studiosapce-client.vercel.app](https://studiosapce-client.vercel.app)

## Project Overview
StudioSpace is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. Studio owners can list their creative spaces, and fellow creators can discover, filter, inspect dynamic availability, and reserve studio slots with transparent pricing and real-time booking management.

## Key Features
- **Dynamic Studio Discovery:** Browse top-rated photo studios, sound stages, podcast rooms, and more with real-time filtering.
- **Secure Authentication & Authorization:** Role-based access using BetterAuth, JWT tokens stored in HTTPOnly cookies for secure mutations.
- **Complete CRUD Operations:** Hosts can seamlessly add, update, and delete their studio listings with image uploads via ImgBB.
- **Smart Booking System:** Real-time availability checking with Double-Booking prevention logic using MongoDB operators.
- **Modern UI/UX:** Fully responsive design with Dark/Light theme toggling, skeleton loaders, and toast notifications (Sonner).

## Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI, Swiper.js
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB Atlas
- **Authentication:** BetterAuth, JWT, MongoDB Adapter
- **Deployment:** Vercel

##  Local Setup Steps
1. Clone the repositories:
   ```bash
   git clone https://github.com/sukriaaktersahal/studiosapce-client.git
   git clone https://github.com/sukriaaktersahal/studiosapce-server.git