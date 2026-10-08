import MarqueeDataFetch from "@/app/allDataFetch/MarqueeDataFetch";
import { MarqueeType } from "@/app/DataType/MarqueeType";
import PriceDecreaseCard from "./PriceDecreaseCard";


const TodayPriceDecrease = async() => {
  const data:MarqueeType[] =await MarqueeDataFetch();
 const topDecreasePrice = [...data].
 filter((item)=>item?.change?.dir === "down")
 .sort((a,b)=>b?.change?.pct - a?.change?.pct)
 .slice(0,6);
  return (
<div className="container mx-auto py-5">
  <h1 className="text-[20px] py-4 font-bold"><span className="text-[#05893E]">{"▼"}</span>আজ দাম কমেছে</h1>
    <div className="grid grid-cols-3 gap-5">
      {
        topDecreasePrice.map(card => <PriceDecreaseCard card={card} key={card.id}/>)
      }
    </div>
</div>

  );
};

export default TodayPriceDecrease;