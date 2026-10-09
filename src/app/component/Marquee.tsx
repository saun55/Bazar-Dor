import MarqueeText from "react-marquee-text";
import MarqueeDataFetch from "../allDataFetch/MarqueeDataFetch";
import { MarqueeType } from "../DataType/MarqueeType";



const unitBn: Record<string, string> = {
  kg: "কেজি",
   litre: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
};

const toBanglaNumber = (value: number | string) => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(
    /\d/g,
    (digit) => banglaDigits[Number(digit)]
  );
};

const Marquee = async () => {



  const data: MarqueeType[] = await MarqueeDataFetch();

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white">

      <MarqueeText direction="right" duration={8} className="flex w-max ">

        {/* First Data */}
        <div className="flex shrink-0">
          {data.map((item) => (
            <div 
              key={item.id}
              className="flex h-10 items-center gap-1.5 border-r border-gray-100 px-4 whitespace-nowrap"
            >
              {/* Category */}
              <span className="text-[13px] text-gray-700">
                {item.categoryIcon} {item.nameBn}
              </span>

              {/* Price */}
              <span className="text-[13px] font-semibold text-gray-700">
                {toBanglaNumber(item.today)} টাকা/
                {unitBn[item.unit] ?? item.unit}
              </span>

              {/* Change */}
              <span
                className={`flex items-center text-[13px] font-bold ${
                  item.change.dir === "up"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {item.change.dir === "up" ? "▲" : "▼"}
                {toBanglaNumber(Math.abs(item.change.pct))}%
              </span>
            </div>
          ))}
        </div>

        {/* Duplicate Data */}
        <div className="flex shrink-0">
          {data.map((item) => (
            <div
              key={`duplicate-${item.id}`}
              className="flex h-10 items-center gap-1.5 border-r border-gray-100 px-4 whitespace-nowrap"
            >
              {/* Category */}
              <span className="text-[13px] text-gray-700">
                {item.categoryIcon} {item.nameBn}
              </span>

              {/* Price */}
              <span className="text-[13px] font-semibold text-gray-700">
                {toBanglaNumber(item.today)} টাকা/
                {unitBn[item.unit] ?? item.unit}
              </span>

              {/* Change */}
              <span
                className={`flex items-center text-[13px] font-bold ${
                  item.change.dir === "up"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {item.change.dir === "up" ? "▲" : "▼"}{" "}
                {toBanglaNumber(Math.abs(item.change.pct))}%
              </span>
            </div>
          ))}
        </div>

      </MarqueeText>

    </div>
  );
};

export default Marquee;