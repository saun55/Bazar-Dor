"use client";

import { useRouter, useSearchParams } from "next/navigation";

const DropDown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sort") || "low";

  const handleSort = (value: "low" | "high") => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="my-5 flex w-full justify-end gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <span className="flex items-center justify-center">
        সাজান
      </span>

      <div className="dropdown dropdown-bottom dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="flex h-11 min-w-44 cursor-pointer items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:shadow-md"
        >
          <span>
            {sortBy === "low"
              ? "কম থেকে বেশি"
              : "বেশি থেকে কম"}
          </span>

          <span className="text-gray-400">⌄</span>
        </div>

        <ul
          tabIndex={-1}
          className="menu dropdown-content z-10 mt-2 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-lg"
        >
          <li>
            <button
              onClick={() => handleSort("low")}
              className="rounded-lg px-3 py-2.5 text-sm hover:bg-gray-100"
            >
              কম থেকে বেশি
            </button>
          </li>

          <li>
            <button
              onClick={() => handleSort("high")}
              className="rounded-lg px-3 py-2.5 text-sm hover:bg-gray-100"
            >
              বেশি থেকে কম
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropDown;