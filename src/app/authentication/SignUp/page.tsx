"use client";

import { signIn, signUp } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Surface,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import { FaGithub } from "react-icons/fa";
import { toast, Zoom } from "react-toastify";

const SignUp = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    const { name, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড সমান নয়!", {
        position: "bottom-center",
        theme: "dark",
      });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর দিন!", {
        position: "bottom-center",
        theme: "dark",
      });
      return;
    }

    const { data: resData, error } = await signUp.email({
      name,
      email,
      password,
      callbackURL: "/authentication/signIn",
    });

    if (error || !resData) {
      toast.error("অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে!", {
        position: "bottom-center",
        theme: "dark",
      });
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন।", {
      position: "bottom-center",
      theme: "dark",
    });

    router.push("/authentication/signIn");
  };

  const handleGoogleSignIn = async () => {
    const data = await signIn.social({
      provider: "google",
    });

    if (data) {
      console.log(data);
      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }

    if (!data) {
      toast.error("সঠিক ইমেইল ঠিকানা দিন!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  };

  const handleGithubSignIn = async () => {
    const data = await signIn.social({
      provider: "github",
    });

    if (data) {
      toast.success("GitHub দিয়ে লগইন সফল হয়েছে!");
    }
    if (!data) {
      toast.error("GitHub দিয়ে লগইন করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f8f4] px-4 py-8  text-[#252a27]">
      {/* Header */}
      <div className="mx-auto mb-6 w-full  max-w-[470px] text-center">
        <h1 className="text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>

        <p className="mt-1 text-sm text-gray-600">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Form Card */}
      <div className="mx-auto w-full max-w-[470px]">
        <Surface className="rounded-2xl  bg-white p-7 shadow-sm">
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full ">
              <Fieldset.Group className="w-full gap-5">
                {/* Name */}
                <TextField
                  isRequired
                  name="name"
                  validate={(value) => {
                    if (value.length < 3) {
                      return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
                    }

                    return null;
                  }}
                >
                  <label className="mb-2 text-base font-medium">নাম</label>

                  <Input
                    placeholder="Enter Your Name"
                    // variant="secondary"
                    className="h-12 rounded-xl border border-gray-200 !bg-white focus:border-base-300 focus:ring-1 focus:ring-[#05893E]"
                  />

                  <FieldError />
                </TextField>

                {/* Email */}
                <TextField isRequired name="email" type="email">
                  <label className="mb-2 text-base font-medium">ইমেইল</label>

                  <Input
                    placeholder="Enter Your Email"
                    variant="secondary"
                    className="h-12 rounded-xl border border-gray-200 !bg-white focus:border-base-300 focus:ring-1 focus:ring-[#05893E]"
                  />

                  <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                  isRequired
                  name="password"
                  type="password"
                  validate={(value) => {
                    if (value.length < 8) {
                      return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                    }

                    return null;
                  }}
                >
                  <label className="mb-2 text-base font-medium">
                    পাসওয়ার্ড
                  </label>

                  <Input
                    placeholder="কমপক্ষে ৮ অক্ষর"
                    variant="secondary"
                    className="h-12 rounded-xl border border-gray-200 !bg-white focus:border-base-300 focus:ring-1 focus:ring-[#05893E]"
                  />

                  <FieldError />
                </TextField>

                {/* Confirm Password */}
                <TextField isRequired name="confirmPassword" type="password">
                  <label className="mb-2 text-base font-medium">
                    পাসওয়ার্ড নিশ্চিত করুন
                  </label>

                  <Input
                    placeholder="আবার লিখুন"
                    variant="secondary"
                    className="h-12 rounded-xl border border-gray-200 !bg-white focus:border-base-300 focus:ring-1 focus:ring-[#05893E]"
                  />

                  <FieldError />
                </TextField>
              </Fieldset.Group>

              {/* Create Account Button */}
              <Fieldset.Actions className="mt-5 w-full">
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-[#079447] text-base font-semibold text-white shadow-md transition-all hover:bg-[#067d3c]"
                >
                  অ্যাকাউন্ট তৈরি করুন
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>

            <span className="text-sm text-gray-600">অথবা</span>

            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="secondary"
              className="h-12 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800"
              onClick={handleGoogleSignIn}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    fill="#4285F4"
                    d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.42z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.54 13.59A5.85 5.85 0 0 1 6.23 12c0-.55.1-1.08.31-1.59V7.88H3.3A9.48 9.48 0 0 0 2.25 12c0 1.53.37 2.98 1.05 4.12l3.24-2.53z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 8.1 9.46 6.38 12 6.38z"
                  />
                </svg>
              </span>
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="h-12 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800"
              onClick={handleGithubSignIn}
            >
              <span className="text-lg">
                <FaGithub />
              </span>
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-gray-700">
            অ্যাকাউন্ট আছে?
            <Link
              href="/authentication/signIn"
              className="font-medium text-[#079447] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </Surface>

        {/* Back */}
        <div className="mt-7 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-gray-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

// "use client";

// import { signIn, signUp } from "@/lib/auth-client";
// import {
// Button,
// FieldError,
// Fieldset,
// Form,
// Input,
// Surface,
// TextField,
// } from "@heroui/react";
// import Link from "next/link";
// import React from "react";
// import { FaGithub } from "react-icons/fa";
// import { toast, Zoom } from "react-toastify";

// const SignUp = () => {
// const toastOptions = {
// position: "bottom-center" as const,
// autoClose: 2000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// theme: "dark" as const,
// transition: Zoom,
// };

// const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// e.preventDefault();

// const form = e.currentTarget;
// const formData = new FormData(form);

// const name = String(formData.get("name") ?? "").trim();
// const email = String(formData.get("email") ?? "").trim();
// const password = String(formData.get("password") ?? "");
// const confirmPassword = String(
//   formData.get("confirmPassword") ?? ""
// );

// if (name.length < 3) {
//   toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে!", toastOptions);
//   return;
// }

// if (password.length < 8) {
//   toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!", toastOptions);
//   return;
// }

// if (!confirmPassword) {
//   toast.error("পাসওয়ার্ড নিশ্চিত করুন!", toastOptions);
//   return;
// }

// if (password !== confirmPassword) {
//   toast.error("পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মিলছে না!", toastOptions);
//   return;
// }

// try {
//   const { data, error } = await signUp.email({
//     name,
//     email,
//     password,
//     callbackURL: "/authentication/signIn",
//   });

//   if (error) {
//     toast.error(
//       error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে!",
//       toastOptions
//     );
//     return;
//   }

//   if (data) {
//     toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!", toastOptions);

//     window.setTimeout(() => {
//       window.location.href = "/authentication/signIn";
//     }, 1200);
//   }
// } catch {
//   toast.error("সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন!", toastOptions);
// }

// };

// const handleGoogleSignIn = async () => {
// try {
// const { error } = await signIn.social({
// provider: "google",
// callbackURL: "/",
// });

//   if (error) {
//     toast.error(
//       error.message || "Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে!",
//       toastOptions
//     );
//   }
// } catch {
//   toast.error("Google দিয়ে সাইন ইন করা যায়নি!", toastOptions);
// }

// };

// const handleGithubSignIn = async () => {
// try {
// const { error } = await signIn.social({
// provider: "github",
// callbackURL: "/",
// });

//   if (error) {
//     toast.error(
//       error.message || "GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে!",
//       toastOptions
//     );
//   }
// } catch {
//   toast.error("GitHub দিয়ে সাইন ইন করা যায়নি!", toastOptions);
// }

// };

// return ( <div className="min-h-screen bg-[#f3f8f4] px-4 py-8 text-[#252a27]">

// {/* Header */}

//  <div className="mx-auto mb-6 w-full max-w-[470px] text-center"> <h1 className="text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>

//     <p className="mt-1 text-sm text-gray-600">
//       বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
//     </p>
//   </div>

//   {/* Form Card */}
//   <div className="mx-auto w-full max-w-[470px]">
//     <Surface className="rounded-2xl bg-white p-7 shadow-sm">
//       <Form onSubmit={onSubmit}>
//         <Fieldset className="w-full">
//           <Fieldset.Group className="w-full gap-5">
//             {/* Name */}
//             <TextField
//               isRequired
//               name="name"
//               validate={(value) => {
//                 if (value.trim().length < 3) {
//                   return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
//                 }
//                 return null;
//               }}
//             >
//               <label className="mb-2 text-base font-medium">নাম</label>

//               <Input
//                 placeholder="Enter Your Name"
//                 autoComplete="name"
//                 className="h-12 rounded-xl border border-gray-200 !bg-white focus:border-base-300 focus:ring-1 focus:ring-[#05893E]"
//               />

//               <FieldError />
//             </TextField>

//             {/* Email */}
//             <TextField isRequired name="email" type="email">
//               <label className="mb-2 text-base font-medium">
//                 ইমেইল
//               </label>

//               <Input
//                 placeholder="Enter Your Email"
//                 autoComplete="email"
//                 variant="secondary"
//                 className="h-12 rounded-xl border border-gray-200 !bg-white focus:border-base-300 focus:ring-1 focus:ring-[#05893E]"
//               />

//               <FieldError />
//             </TextField>

//             {/* Password */}
//             <TextField
//               isRequired
//               name="password"
//               type="password"
//               validate={(value) => {
//                 if (value.length < 8) {
//                   return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
//                 }
//                 return null;
//               }}
//             >
//               <label className="mb-2 text-base font-medium">
//                 পাসওয়ার্ড
//               </label>

//               <Input
//                 placeholder="কমপক্ষে ৮ অক্ষর"
//                 autoComplete="new-password"
//                 variant="secondary"
//                 className="h-12 rounded-xl border border-gray-200 !bg-white focus:border-base-300 focus:ring-1 focus:ring-[#05893E]"
//               />

//               <FieldError />
//             </TextField>

//             {/* Confirm Password */}
//             <TextField
//               isRequired
//               name="confirmPassword"
//               type="password"
//               validate={(value, formValues) => {
//                 if (!value) {
//                   return "পাসওয়ার্ড নিশ্চিত করুন";
//                 }

//                 if (value !== formValues.password) {
//                   return "পাসওয়ার্ড দুটি মিলছে না";
//                 }

//                 return null;
//               }}
//             >
//               <label className="mb-2 text-base font-medium">
//                 পাসওয়ার্ড নিশ্চিত করুন
//               </label>

//               <Input
//                 placeholder="আবার পাসওয়ার্ড লিখুন"
//                 autoComplete="new-password"
//                 variant="secondary"
//                 className="h-12 rounded-xl border border-gray-200 !bg-white focus:border-base-300 focus:ring-1 focus:ring-[#05893E]"
//               />

//               <FieldError />
//             </TextField>
//           </Fieldset.Group>

//           {/* Create Account Button */}
//           <Fieldset.Actions className="mt-5 w-full">
//             <Button
//               type="submit"
//               className="h-12 w-full rounded-xl bg-[#079447] text-base font-semibold text-white shadow-md transition-all hover:bg-[#067d3c]"
//             >
//               অ্যাকাউন্ট তৈরি করুন
//             </Button>
//           </Fieldset.Actions>
//         </Fieldset>
//       </Form>

//       {/* Divider */}
//       <div className="my-5 flex items-center gap-4">
//         <div className="h-px flex-1 bg-gray-200" />
//         <span className="text-sm text-gray-600">অথবা</span>
//         <div className="h-px flex-1 bg-gray-200" />
//       </div>

//       {/* Social Login */}
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//         <Button
//           type="button"
//           variant="secondary"
//           className="h-12 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800"
//           onClick={handleGoogleSignIn}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             className="h-5 w-5"
//             aria-hidden="true"
//           >
//             <path
//               fill="#4285F4"
//               d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.42z"
//             />
//             <path
//               fill="#34A853"
//               d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M6.54 13.59A5.85 5.85 0 0 1 6.23 12c0-.55.1-1.08.31-1.59V7.88H3.3A9.48 9.48 0 0 0 2.25 12c0 1.53.37 2.98 1.05 4.12l3.24-2.53z"
//             />
//             <path
//               fill="#EA4335"
//               d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 8.1 9.46 6.38 12 6.38z"
//             />
//           </svg>
//           Google দিয়ে চালিয়ে যান
//         </Button>

//         <Button
//           type="button"
//           variant="secondary"
//           className="h-12 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800"
//           onClick={handleGithubSignIn}
//         >
//           <FaGithub className="text-lg" />
//           GitHub দিয়ে চালিয়ে যান
//         </Button>
//       </div>

//       {/* Login */}
//       <p className="mt-6 text-center text-sm text-gray-700">
//         অ্যাকাউন্ট আছে?{" "}
//         <Link
//           href="/authentication/signIn"
//           className="font-medium text-[#079447] hover:underline"
//         >
//           সাইন ইন করুন
//         </Link>
//       </p>
//     </Surface>

//     {/* Back */}
//     <div className="mt-7 text-center">
//       <Link
//         href="/"
//         className="text-sm text-gray-500 transition hover:text-gray-800"
//       >
//         ← হোম পেজে ফিরে যান
//       </Link>
//     </div>
//   </div>
// </div>

// );
// };

// export default SignUp;
