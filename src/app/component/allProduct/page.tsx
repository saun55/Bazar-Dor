import MarqueeDataFetch from "@/app/allDataFetch/MarqueeDataFetch";
import { MarqueeType } from "@/app/DataType/MarqueeType";
import AllProductCard from "../HomeCard/AllProductCard";

const AllProduct = async () => {
const data: MarqueeType[] = await MarqueeDataFetch();

return ( <section id="AllProduct" className="container mx-auto px-4 py-10"> <div className="pb-5"> <h1 className="text-[20px] font-bold">সব পণ্য</h1> <h2>
মোট{" "} <span>{data.length.toLocaleString("bn-BD")}</span>
টি পণ্য দেখানো হচ্ছে </h2> </div>


  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {data.map((cart) => (
      <AllProductCard key={cart.id} card={cart} />
    ))}
  </div>
</section>


);
};

export default AllProduct;
