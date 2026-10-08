import MarqueeDataFetch from "../../allDataFetch/MarqueeDataFetch";
import { MarqueeType } from "../../DataType/MarqueeType";

import PriceIncreaseCard from "./PriceIncreaseCard";



const TodayPriceIncrease = async() => {
  const product:MarqueeType[] = await MarqueeDataFetch()
  
const topIncreaseProduct = [...product]
.filter((item)=>item.change?.dir === "up")
.sort((a,b)=>b.change.pct - a.change.pct)
.slice(0,6);


  return (
<section className="py-5 container mx-auto">
  <h1 className="font-bold py-3 text-[20px]"><span className="text-red-500">{"▲"}</span>আজ দাম বেড়েছে</h1>
    <div className="grid grid-cols-3 gap-5">
    {
      topIncreaseProduct.map(item=> <PriceIncreaseCard item={item} key={item.id}/>)
    }
    </div>
</section>
  );
};

export default TodayPriceIncrease;