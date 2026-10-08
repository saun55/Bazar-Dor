"use client";


import { signOut } from "@/lib/auth-client";
import Link from "next/link";
import { Flip, toast } from "react-toastify";

const SignOut = () => {

const handleSignOut = async()=>{
try{
 await signOut();


  toast.success("সফলভাবে সাইন আউট হয়েছে!", {
position: "bottom-center",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Flip,
});


}catch(error){
  console.error(error);

    toast.success("সাইন আউট করা যায়নি!", {
position: "bottom-center",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Flip,
});

}
}


  return (
    <Link href={"/authentication/signIn"}>
                <button
                  onClick={() => handleSignOut()}
                  className="w-full rounded-lg px-3 py-2 text-left text-red-600 transition hover:bg-red-50"
                >
                  ↩ সাইন আউট
                </button>
                
                </Link>
  );
};

export default SignOut;
