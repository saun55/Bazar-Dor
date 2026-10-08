const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f8f4] px-5">
      <div className="flex flex-col items-center text-center">
        
        {/* Spinner */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-[#dceee2] border-t-[#05893E]" />

          <div className="h-10 w-10 rounded-full bg-[#05893E] opacity-10" />
        </div>

        {/* Text */}
        <h1 className="mt-6 text-xl font-bold text-[#252a27]">
          লোড হচ্ছে...
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          অনুগ্রহ করে একটু অপেক্ষা করুন
        </p>

        {/* Dots */}
        <div className="mt-4 flex gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#05893E]" />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#05893E]"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#05893E]"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;