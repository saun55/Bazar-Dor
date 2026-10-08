"use client";

import { updateUser, useSession } from "@/lib/auth-client";
import Image from "next/image";
import GoogleSignIn from "../component/SignOut";
import { toast } from "react-toastify";
import { object } from "better-auth";
import SignOut from "../component/SignOut";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session } = useSession();

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const formData = new FormData(e.currentTarget);
      const newData = Object.fromEntries(formData.entries()) as {name:string}

const handleUpdateUser = await updateUser({
  ...newData,

})

if(handleUpdateUser){
  toast.success("success")
}
   }

  return (
    <div className="min-h-screen bg-[#f3f8f4] px-5 py-10">
      <div className="mx-auto w-full max-w-[830px]">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#252a27]">আমার প্রোফাইল</h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#dce4de] bg-white p-7 shadow-sm sm:flex-row">
          {/* Profile Info */}
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 overflow-hidden rounded-2xl bg-gray-100">
              {/* image */}
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session?.user?.name || "User"}
                  width={36}
                  height={36}
                  className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center text-center rounded-full bg-[#05893E] text-sm font-bold text-white sm:h-9 sm:w-9">
                  {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
{/* name */}
            <div>
              <h2 className="text-2xl font-semibold text-[#252a27]">
                {session?.user?.name}
              </h2>
{/* email */}
              <p className="text-lg text-gray-500">{session?.user?.email}</p>
            </div>
          </div>

          {/* Sign Out */}
          <SignOut />
          
        </div>

        {/* Update Section */}

        <form onSubmit={onSubmit} className="fieldset mt-7 rounded-2xl border border-[#dce4de] bg-white p-6 shadow-sm sm:p-7"
        
        >
          <legend className="fieldset-legend px-2 text-lg font-bold text-[#252a27]">
            তথ্য
          </legend>

          {/* Name */}
          <label className="label mb-2 mt-5 text-base text-[#252a27]">
            নাম
          </label>

          <input
            type="text"
            name= "name"
            className="input h-12 w-full rounded-xl border-[#dce4de] bg-white"
            placeholder=""
          />

          {/* Update Button */}
          <button className="btn mt-5 h-12 w-full rounded-xl border-none bg-[#05893E] text-base font-semibold text-white shadow-md hover:bg-[#067b39]"
          >
            আপডেট
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
