import Image from "next/image";
import banner from "@/assets/bazar-hero.png"
import Link from "next/link";

const Banner = () => {
  const data = new Date().toLocaleDateString("bn-BD",{
    dateStyle:"full"
  }) 
  return (
<div className="container mx-auto px-4 py-5">
  <section className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-base-300 px-6 py-6 md:flex-row md:px-8">

    {/* Text */}
    <div className="space-y-3">
      <p className="w-fit rounded-2xl bg-[#7fcda180] px-3 py-1 text-[#05893E]">
        {data}
      </p>

      <h1 className="text-3xl font-bold text-[#1D241F]">
        আজকের বাজারের দাম এক নজরে
      </h1>

      <p className="max-w-2xl leading-7 text-gray-700">
        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
        বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
      </p>
<Link href={"/component/allProduct"}>
      <button className="btn bg-[#05893E] text-white hover:bg-[#047a37]">
        সব পণ্য দেখুন
      </button>
</Link>
    </div>

    {/* Banner Logo */}
    <div className="shrink-0">
      <Image
        src={banner}
        width={250}
        height={250}
        alt="বাজার দর ব্যানার"
        className="h-auto w-48 md:w-60"
      />
    </div>

  </section>
</div>
  );
};

export default Banner;