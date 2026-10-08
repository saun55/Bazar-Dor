"use client";

import logo from "@/assets/logo-icon.png";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import SignOut from "../authentication/signButton/SignOut";
import { useEffect, useState } from "react";
import baseUrl from "@/service/baseUrl";
import { CategoryType } from "../DataType/CategoriesType";


const Navbar = () => {
  const { data: session } = useSession();

const [categories,setCategories] =useState<CategoryType[]>([])

  const today = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

useEffect(()=>{
  fetch(`${baseUrl}/categories`).
  then(res=> res.json()).
  then(data=> setCategories(data)).
  catch(error => console.log(error))
},[])


  return (
    <div className="bg-base-200 py-3 shadow-sm sm:py-4">
      <div className="container mx-auto space-y-2 px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between gap-3">
          {/* Logo + Website Info */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            {/* Logo */}
            <Link href={"/"} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#05893E] sm:h-12 sm:w-12">
              <Image
                src={logo}
                alt="NavLogo"
                width={25}
                height={25}
                className="h-6 w-6 object-contain"
              />
            </Link>

            {/* Website Name */}
            <Link href={"/"} className="min-w-0">
              <h1 className="truncate text-base font-bold sm:text-lg md:text-xl">
                বাজার দর
              </h1>

              <span className="block truncate text-[10px] text-gray-600 sm:text-xs md:text-sm">
                {today}
              </span>
            </Link>
          </div>

          {/* Right Side */}
          {session?.user ? (
            <div className="dropdown dropdown-end shrink-0">
              {/* User Button */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost h-auto min-h-0 gap-2 px-2 py-1.5 sm:px-3 sm:py-2"
              >
                {/* User Image */}
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session?.user?.name || "User"}
                    width={36}
                    height={36}
                    className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#05893E] text-sm font-bold text-white sm:h-9 sm:w-9">
                    {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}

                {/* User Name */}
                <span className="hidden max-w-28 truncate font-medium sm:block">
                  {session?.user?.name}
                </span>

                <span className="text-xs">▼</span>
              </div>

              {/* Dropdown */}
              <div
                tabIndex={-1}
                className="dropdown-content menu z-50 mt-2 w-64 rounded-xl bg-base-100 p-2 shadow-lg"
              >
                {/* User Information */}
                <div className="mb-2 rounded-lg bg-base-200 p-3">
                  <p className="truncate font-semibold">
                    {session?.user?.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {session?.user?.email}
                  </p>
                </div>

                {/* Profile */}
                <Link
                  href="/Profile"
                  className="rounded-lg px-3 py-2 transition hover:bg-base-200"
                >
                  👤 আমার প্রোফাইল
                </Link>
  {/* Sign Out */}
   <SignOut/>       

              </div>
            </div>
          ) : (
            /* Auth Buttons */
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Link href="/authentication/signIn">
                <button className="btn btn-sm px-3 font-bold sm:btn-md sm:px-5">
                  সাইন ইন
                </button>
              </Link>

              <Link href="/authentication/SignUp">
                <button className="btn btn-sm border-[#05893E] bg-[#05893E] px-3 text-white hover:bg-[#046F32] sm:btn-md sm:px-5">
                  সাইন আপ
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* NavLink */}
              <div className="flex gap-3">
        {
          categories.map(cate=>{
            return(
              <Link href={`/Categories/${cate.id}`} key={cate.id}>
<span><span>{cate.icon}</span>{cate.nameBn}</span>

              </Link>
            )
          })
        }
       
      </div>

      </div>

    </div>
  );
};

export default Navbar;