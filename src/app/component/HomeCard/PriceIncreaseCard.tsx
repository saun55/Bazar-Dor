import Link from "next/link";
import { MarqueeType } from "../../DataType/MarqueeType";
import AuthLink from "@/app/AuthLink/AuthLink";

const unitBn: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  piece: "প্রতি পিস",
  dozen: "প্রতি ডজন",
};

const toBanglaNumber = (value: number | string) => {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return String(value).replace(
    /\d/g,
    (digit) => banglaDigits[Number(digit)]
  );
};

const PriceIncreaseCard = ({item}:{item:MarqueeType}) => {
  const isUp = item?.change?.dir === "up";

  return (
<AuthLink card={item}>
    <div className="w-full  rounded-2xl border border-gray-200 bg-[#fdfefd] p-4 shadow-sm">

      {/* Top Section */}
      <div className="flex items-center gap-3">

        {/* Image / Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f1f5f1] text-2xl">
          {item?.categoryIcon}
        </div>

        {/* Name + Unit */}
        <div>
          <h2 className="text-[16px] font-semibold leading-tight text-[#252a27]">
            {item?.categoryNameBn}
          </h2>

          <p className="mt-1 text-[12px] text-gray-500">
            {unitBn[item?.unit] ?? item?.unit}
          </p>
        </div>

      </div>

      {/* Price Section */}
      <div className="mt-4 flex items-end justify-between">

        <div>
          <p className="text-[12px] text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-[20px] font-bold leading-none text-[#252a27]">
            {toBanglaNumber(item?.today)}
            <span className="ml-1 text-[13px] font-normal text-gray-600">
              টাকা
            </span>
          </p>
        </div>

        {/* Change */}
        <div
          className={`rounded-full px-3 py-1 text-[11px] font-bold ${
            isUp
              ? "bg-[#f2f5f1] text-red-500"
              : "bg-[#f2f5f1] text-green-600"
          }`}
        >
          {isUp ? "▲" : "▼"}{" "}
          {toBanglaNumber(Math.abs(item?.change?.pct))}%
        </div>

      </div>
    </div>
</AuthLink>
  );
};

export default PriceIncreaseCard;
