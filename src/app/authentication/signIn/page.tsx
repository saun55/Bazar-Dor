"use client";

import { signIn } from "@/lib/auth-client";
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
import { redirect } from "next/navigation";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { toast, Zoom } from "react-toastify";

const SignInPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      callbackURL: string;
      image: string;
    };
    console.log(data);
    const { data: resData, error } = await signIn.email({
      ...data,
      callbackURL: "/",
    });

    if (resData) {
      console.log(data);

      toast.success("সফলভাবে সাইন ইন হয়েছে!", {
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

      redirect("/");
    }

    if (!resData) {
      console.log(error);
      toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়!", {
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

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (data) {
        console.log(data);
        toast.success("Google দিয়ে সফলভাবে সাইন ইন হয়েছে!");
      }

      if (error) {
        console.error(error);
        toast.error("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে!", {
          position: "bottom-center",
          autoClose: 1000,
          theme: "dark",
          transition: Zoom,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Google দিয়ে সাইন ইন ব্যর্থ হয়েছে!");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const { data, error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
        errorCallbackURL: "/",
      });

      if (data) {
        console.log(data);
        toast.success("GitHub দিয়ে সফলভাবে সাইন ইন হয়েছে!");
      }

      if (error) {
        console.error(error);
        toast.error("GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে!", {
          position: "bottom-center",
          autoClose: 1000,
          theme: "dark",
          transition: Zoom,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("GitHub দিয়ে সাইন ইন ব্যর্থ হয়েছে!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f8f4] px-4 py-8 text-[#252a27]">
      {/* Header */}
      <div className="mx-auto mb-6 w-full max-w-[470px] text-center">
        <h1 className="text-3xl font-bold">সাইন ইন</h1>

        <p className="mt-1 text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Form Card */}
      <div className="mx-auto w-full max-w-[470px]">
        <Surface className="rounded-2xl bg-white p-7 shadow-sm">
          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full">
              <Fieldset.Group className="w-full gap-5">
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
                    className="h-12 rounded-xl border border-[#05893E] bg-white focus:border-base-300 focus:ring-1 focus:ring-[#05893E]"
                  />

                  <FieldError />
                </TextField>
              </Fieldset.Group>

              {/* Sign In Button */}
              <Fieldset.Actions className="mt-5 w-full">
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-[#05893E] text-base font-semibold text-white shadow-md transition-all hover:bg-[#046F32]"
                >
                  সাইন ইন করুন
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-sm text-gray-600">অথবা</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <Button
              type="button"
              variant="secondary"
              className="h-12 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 transition hover:border-[#05893E]"
              onClick={() => handleGoogleSignIn()}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
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

            {/* GitHub */}
            <Button
              type="button"
              variant="secondary"
              className="h-12 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-800 transition hover:border-[#05893E]"
              onClick={() => handleGithubSignIn()}
            >
              <span className="text-lg">
                <FaGithub />
              </span>
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-gray-700">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/authentication/SignUp"
              className="font-medium text-[#05893E] hover:underline"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
        </Surface>

        {/* Back */}
        <div className="mt-7 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-[#05893E]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
