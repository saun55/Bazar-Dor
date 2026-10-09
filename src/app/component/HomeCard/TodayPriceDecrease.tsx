import MarqueeDataFetch from "@/app/allDataFetch/MarqueeDataFetch";
import { MarqueeType } from "@/app/DataType/MarqueeType";
import PriceDecreaseCard from "./PriceDecreaseCard";

const TodayPriceDecrease = async () => {
const data: MarqueeType[] = await MarqueeDataFetch();

const topDecreasePrice = [...data]
.filter((item) => item?.change?.dir === "down")
.sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
.slice(0, 6);

return ( <section className="container mx-auto px-4 py-5"> <h1 className="py-4 text-xl font-bold"> <span className="text-[#05893E]">▼</span> আজ দাম কমেছে </h1>


  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {topDecreasePrice.map((card) => (
      <PriceDecreaseCard card={card} key={card.id} />
    ))}
  </div>
</section>


);
};

export default TodayPriceDecrease;
