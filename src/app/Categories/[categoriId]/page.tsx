import PriceCard from "@/app/component/PriceCard";
import { CategoriesDeatailsType } from "@/app/DataType/CategoriesDeatailsType";
import baseUrl from "@/service/baseUrl";


const CategoriesDetailsPage = async ({
  params,
}: {
  params: Promise<{ categoriId: string }>;
}) => {
  const {categoriId} = await params;

  const res = await fetch(`${baseUrl}/products?category=${categoriId}`)
  const data:CategoriesDeatailsType[] = await res.json()

  const categoriesInfo = data.find(c=>c.category === categoriId)

  return(
  <>
  <div className="container mx-auto">
    {/* 1st Cart */}


  <div className="flex gap-2 w-full rounded-2xl border border-gray-200 bg-[#fdfefd] p-4 shadow-sm my-4">
 <p className="flex justify-center items-center">{categoriesInfo?.categoryIcon}</p>
    <div>
      <h1 className="text-2xl font-bold">{categoriesInfo?.categoryNameBn}</h1>
{categoriId.length.toLocaleString("bn-BD")}<span>টি পণ্যের আজকের দাম ও পরিবর্তন</span>
    </div>
  </div>

{/* DropDown */}


{/* Sort Dropdown */}

<div className="flex w-full justify-end rounded-2xl border border-gray-200 bg-white p-4 my-5 gap-3 shadow-sm">
  <span className="flex justify-center items-center">সাজান</span>
  <div className="dropdown dropdown-bottom dropdown-end">
   
    <div
      tabIndex={0}
      role="button"
      className="flex h-11 min-w-44 cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:shadow-md"
    >
      <span>ডিফল্ট</span>
      <span className="text-gray-400">⌄</span>
    </div>

    <ul
      tabIndex={-1}
      className="menu dropdown-content z-10 mt-2 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-lg"
    >
      <li>
        <a className="rounded-lg px-3 py-2.5 text-sm hover:bg-gray-100">
          কম থেকে বেশি
        </a>
      </li>

      <li>
        <a className="rounded-lg px-3 py-2.5 text-sm hover:bg-gray-100">
          বেশি থেকে কম
        </a>
      </li>
    </ul>
  </div>
</div>
{/* <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><a>Link</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div> */}






  <div className="grid grid-cols-3 my-5 justify-between  gap-4 ">


    {
      data.map(item=><PriceCard key={item.id} item={item}/>)
    }
  </div>
  </div>
  </>)
};

export default CategoriesDetailsPage;
