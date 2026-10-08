import Image from "next/image";
import MarqueeDataFetch from "@/app/allDataFetch/MarqueeDataFetch";
import { CategoriesDeatailsType } from "@/app/DataType/CategoriesDeatailsType";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
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

const CategoriesDetailsPage = async ({
  params,
}: {
  params: Promise<{ Id: string }>;
}) => {
  const { Id } = await params;

  const data: CategoriesDeatailsType[] = await MarqueeDataFetch();

  // Find the specific product by ID
  const product = data.find((item) => String(item.id) === String(Id));

  // Product not found
  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3f8f4] px-4">
        <div className="rounded-2xl border border-[#dce5df] bg-white p-10 text-center shadow-sm">
          <div className="mb-4 text-5xl">🔍</div>

          <h1 className="text-2xl font-bold text-[#202721]">
            পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনি যে পণ্যের তথ্য খুঁজছেন সেটি পাওয়া যায়নি।
          </p>
        </div>
      </main>
    );
  }

  const isUp = product.change?.dir === "up";

  // All market prices
  const markets = product.markets ?? [];

  // Minimum price
  const minimumPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => Number(market.min)))
      : 0;

  // Maximum price
  const maximumPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => Number(market.max)))
      : 0;

  // Average price
  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) =>
            total + (Number(market.min) + Number(market.max)) / 2,
          0
        ) / markets.length
      : 0;

  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <span>হোম</span>
          <span>›</span>

          <span>{product.categoryNameBn}</span>

          <span>›</span>

          <span>{product.nameBn}</span>
        </div>

        {/* Product Header */}
        <section className="flex flex-col justify-between gap-6 rounded-2xl border border-[#dce5df] bg-white p-6 md:flex-row md:items-center">

          {/* Left */}
          <div className="flex items-center gap-5">

            {/* Image */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f1f5f1]">

              {product.image &&
              (product.image.startsWith("http") ||
                product.image.startsWith("/")) ? (
                <Image
                  src={product.image}
                  alt={product.nameBn}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-4xl" aria-hidden="true">
                  {product.image || product.categoryIcon || "📦"}
                </span>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl font-bold text-[#202721] md:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {unitBn[product?.unit] } <span>{ product?.categoryNameBn}</span>
              </p>

              <p className="mt-2 text-xs text-gray-600">
                গতকালের তুলনায় আজ দাম{" "}
                <span
                  className={`font-semibold ${
                    isUp ? "text-black" : "text-green-600"
                  }`}
                >
                  {isUp ? "বেড়েছে" : "কমেছে"}
                </span>{" "}
                · {toBanglaNumber(`${product.today - product.yesterday} টাকা`)}
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="rounded-xl bg-[#f2f7f3] px-8 py-4 text-center">

            <p className="text-xs text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-2xl font-bold text-[#202721]">
              {toBanglaNumber(product.today)}
            </p>

            <p className="text-xs text-gray-500">
              টাকা / {unitBn[product.unit] ?? product.unit}
            </p>

            <p
              className={`mt-1 text-xs font-bold ${
                isUp ? "text-red-500" : "text-green-600"
              }`}
            >
              {isUp ? "▲" : "▼"}{" "}
              {toBanglaNumber(Math.abs(product.change?.pct ?? 0))}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-5 rounded-2xl border border-[#dce5df] bg-white p-5">

          <h2 className="mb-4 text-lg font-bold text-[#202721]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* Minimum */}
            <div className="rounded-xl border border-[#dce5df] p-4">

              <p className="text-xs text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {toBanglaNumber(minimumPrice)}
                <span className="ml-1 text-xs font-normal text-green-600">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Maximum */}
            <div className="rounded-xl border border-[#dce5df] p-4">

              <p className="text-xs text-gray-500">
                সর্বাধিক দাম
              </p>

              <p className="mt-1 text-xl font-bold text-red-500">
                {toBanglaNumber(maximumPrice)}
                <span className="ml-1 text-xs font-normal text-red-500">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average */}
            <div className="rounded-xl border border-[#dce5df] p-4">

              <p className="text-xs text-gray-500">
                গড় দাম
              </p>

              <p className="mt-1 text-xl font-bold text-green-600">
                ৳{toBanglaNumber(Number(averagePrice.toFixed(0)))}
                <span className="ml-1 text-xs font-normal text-green-600">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {unitBn[product.unit] ?? product.unit}-এর হিসাবে
              </p>
            </div>

          </div>
        </section>

        {/* Market Prices */}
        <section className="mt-5 rounded-2xl border border-[#dce5df] bg-white p-5">

          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-[#202721]">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <span className="rounded-full bg-[#f2f7f3] px-3 py-1 text-xs text-gray-500">
              {toBanglaNumber(markets.length)}টি বাজার
            </span>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px] border-collapse text-sm">

              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">

                  <th className="px-3 py-3 font-medium">
                    বাজার
                  </th>

                  <th className="px-3 py-3 font-medium">
                    বিভাগ
                  </th>

                  <th className="px-3 py-3 font-medium">
                    সর্বনিম্ন
                  </th>

                  <th className="px-3 py-3 font-medium">
                    সর্বাধিক
                  </th>

                  <th className="px-3 py-3 text-right font-medium">
                    গড়
                  </th>

                </tr>
              </thead>

              <tbody>
                {markets.map((market) => {

                  const marketAverage =
                    (Number(market.min) + Number(market.max)) / 2;

                  return (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className="border-b border-gray-200 last:border-none hover:bg-[#f8faf8]"
                    >

                      {/* Market */}
                      <td className="px-3 py-3 font-medium text-[#202721]">
                        {market.market}
                      </td>

                      {/* Division */}
                      <td className="px-3 py-3 text-gray-600">
                        {market?.division}
                      </td>

                      {/* Minimum */}
                      <td className="px-3 py-3">
                        <span className="font-medium ">
                          ৳{toBanglaNumber(market.min)}
                        </span>{" "}
                        <span className="text-xs text-gray-500">
                          টাকা
                        </span>
                      </td>

                      {/* Maximum */}
                      <td className="px-3 py-3">
                        <span className="font-medium ">
                          ৳{toBanglaNumber(market.max)}
                        </span>{" "}
                        <span className="text-xs text-gray-500">
                          টাকা
                        </span>
                      </td>

                      {/* Average */}
                      <td className="px-3 py-3 text-right font-semibold text-[#202721]">
                        ৳{toBanglaNumber(marketAverage.toFixed(2))} টাকা
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>

          </div>
        </section>

      </div>
    </main>
  );
};

export default CategoriesDetailsPage;