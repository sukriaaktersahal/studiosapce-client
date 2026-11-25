// skeleton loading page
export default function Loading(){
  return(
    <div className = "container mx-auto py-20 px-4">
      <div className = "flex flex-col items-center justify-center space-y-4">
        {/* spinner icon */}
        <div className = "w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <p className = "text-gray-500 font-medium animate-pulse">Loading StudioSpace...</p>
      </div>
    </div>
  );
}