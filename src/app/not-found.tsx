import Link from "next/link";



const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-6">
      <div className="text-center max-w-lg">
        {/* 404 */}
        <h1 className="text-[120px] md:text-[160px] font-extrabold leading-none text-[#05893E]">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-base-content mt-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-base-content/60 mt-4 leading-relaxed">
          Sorry, the page you are looking for doesn&lsquo;t exist or may have been
          moved to another location.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center mt-8 px-6 py-3 rounded-lg bg-[#05893E] text-white font-semibold shadow-md hover:bg-[#047532] transition-all duration-300 hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

