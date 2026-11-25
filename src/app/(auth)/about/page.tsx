// about page
export default function AboutPage(){
  return(
    <div className = "container mx-auto px-4 py-16 min-h-screen">
      <h1 className = "text-4xl font-bold mb-6 text-center">About StudioSpace</h1>
      <p className = "text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center mb-10">
        StudioSpace is a peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. 
        We connect studio owners with creators looking for the perfect space.
      </p>
      
      <div className = "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className = "bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-sm">
          <h2 className = "text-2xl font-semibold mb-4">Our Mission</h2>
          <p className = "text-gray-600 dark:text-gray-400">
            To empower creators worldwide by providing seamless access to high-quality creative workspaces and production studios.
          </p>
        </div>

        <div className= "bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-sm">
          <h2 className ="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <p className = "text-gray-600 dark:text-gray-400">
            We offer transparent pricing, real-time availability, and verified hosts to ensure your next big project is a success.
          </p>
        </div>
      </div>
    </div>
  );
}