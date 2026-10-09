export const dynamic = "force-dynamic";

import PriceCard from "@/app/component/PriceCard";
import { CategoriesDeatailsType } from "@/app/DataType/CategoriesDeatailsType";
import DropDown from "@/app/sortDropDown/DropDown";
import baseUrl from "@/service/baseUrl";




export async function generateStaticParams() {
  const posts = await fetch(`${baseUrl}/products?category`);

  if (!posts.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: CategoriesDeatailsType[] = await posts.json();
  return data.map((item) => ({ categoriId: item.id }));
}

const CategoriesDetailsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ categoriId: string }>;
  searchParams: Promise<{ sort?: "low" | "high" }>;
}) => {
  const { categoriId } = await params;
  const { sort } = await searchParams;

  const res = await fetch(`${baseUrl}/products?category=${categoriId}`);

  const data: CategoriesDeatailsType[] = await res.json();

  const categoriesInfo = data.find((c) => c.category === categoriId);

  
  const sortedData = [...data];

  if (sort === "low") {
    sortedData.sort((a, b) => a.today - b.today);
  }

  if (sort === "high") {
    sortedData.sort((a, b) => b.today - a.today);
  }

  return (
    <div className="container mx-auto">
      {/* Category Info */}
      <div className="my-4 flex w-full gap-2 rounded-2xl border border-gray-200 bg-[#fdfefd] p-4 shadow-sm">
        <p className="flex items-center justify-center">
          {categoriesInfo?.categoryIcon}
        </p>

        <div>
          <h1 className="text-2xl font-bold">
            {categoriesInfo?.categoryNameBn}
          </h1>

          <span>
            {data.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
          </span>
        </div>
      </div>

      {/* DropDown */}
      <DropDown />

      {/* Total */}
      <h1>
        মোট <span>{sortedData.length.toLocaleString("bn-BD")}</span>
        টি পণ্য দেখানো হচ্ছে
      </h1>

      {/* Products */}
      <div className="my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedData.map((item) => (
          <PriceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesDetailsPage;
