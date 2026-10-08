import MarqueeDataFetch from "@/app/allDataFetch/MarqueeDataFetch";
import { MarqueeType } from "@/app/DataType/MarqueeType";
import AllProductCard from "../HomeCard/AllProductCard";


const AllProduct = async() => {
  const data:MarqueeType[] =await MarqueeDataFetch();

  return (
<>

    <div className="container  mx-auto py-10">
<div className="pb-5">
      <h1 className="font-bold text-[20px]">সব পণ্য</h1>
      <h2 className="">মোট <span>{data.length.toLocaleString("bn-BD")}</span>টি পণ্য দেখানো হচ্ছে</h2>


</div>

      <div className="grid grid-cols-3 gap-5">
        {
data.map(cart=><AllProductCard key={cart.id} card={cart}/>)
        }
      </div>
    </div>

    </>
  );
};

export default AllProduct;