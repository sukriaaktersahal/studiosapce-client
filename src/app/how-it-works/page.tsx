// how it wors page
export default function HowItWorksPage(){
  const steps = [
    { title: "1. Discover Spaces", desc: "Browse our curated list of photo studios, sound stages, and podcast rooms." },
    { title: "2. Select Shoot Hours", desc: "Check real-time availability and pick the exact hours you need." },
    { title: "3. Book Instantly", desc: "Secure your slot with transparent pricing and no hidden fees." },
    { title: "4. Create & Produce", desc: "Show up at the studio and bring your creative vision to life." },
  ];

  return(
    <div className = "container mx-auto px-4 py-16 min-h-screen">
      <h1 className = "text-4xl font-bold mb-4 text-center">How Booking Works</h1>
      <p className = "text-center text-gray-500 dark:text-gray-400 mb-12">
        Booking your next creative space is just 4 simple steps away.
      </p>

      <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) =>(
          <div key={index} className = "border dark:border-gray-800 p-6 rounded-xl shadow-sm text-center">
            <h3 className ="text-xl font-semibold mb-3">{step.title}</h3>
            <p className= "text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}