"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import cn from "classnames";
import { Field, Form, Formik, useField } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast, Slide } from "react-toastify";
import SocialAuthButton from "./SocialLogin";

const getCharacterValidationError = (str) => {
  return `must have at least 1 ${str} character`;
};

const SignUpSchema = Yup.object().shape({
  fullname: Yup.string().required("Field is required"),
  email: Yup.string().email("Invalid email").required("Field is required"),
  password: Yup.string()
    .required("Field is required")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[Link-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(/[^\w]/, getCharacterValidationError("special")),
});

const TextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <div className="w-full">
        <label
          htmlFor={props.name}
          className="block text-sm mb-2 font-medium leading-none"
        >
          {label}
        </label>
        <input
          className={cn(
            " w-full py-2 px-3 h-9 bg-[#1a1a1a] mb-2 rounded-md text-sm border border-[#575757] leading-4  focus:outline-none focus:ring-1 focus:ring-primary ",
            meta.error && "border-red-400"
          )}
          {...props}
          {...field}
        />
        {meta.error && meta.touched ? (
          <div className="text-red-700 text-sm">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

const SignUp = () => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const router = useRouter();

  async function signUp(formData) {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          email: formData.email,
          name: formData.fullname,
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      toast.success(
        "Success! Please check your email for further instructions.",
        {
          position: "top-right",
          transition: Slide,
          theme: "light",
          toastId: "sign-up-success",
        }
      );
      router.push("/login");
    }
  }

  return (
    <div className="mx-auto px-4 pt-6 sm:px-16 md:px-20 lg:mt-12 2xl:px-28 w-full overflow-hidden max-w-xl">
      <h2 className="text-2xl leading-none tracking-tight">
        Create your account
      </h2>
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
      {successMsg && <div className="text-black">{successMsg}</div>}
      <div className="mt-12">
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={signUp}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="w-full flex flex-col gap-4">
              <TextField
                id="fullname"
                name="fullname"
                placeholder="Fullname"
                label="Fullname"
                type="text"
              />
              <TextField
                id="email"
                name="email"
                placeholder="jdoe@example.com"
                label="Email"
                type="email"
              />
              <TextField
                id="password"
                name="password"
                placeholder="•••••••••••••"
                label="Password"
                type="password"
              />

              <button
                className="whitespace-nowrap inline-flex items-center text-sm font-medium relative rounded-md transition disabled:cursor-not-allowed bg-primary  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 disabled:hover:opacity-40 h-9 px-4 py-2.5 my-2 w-full justify-center"
                disabled={!isValid}
                type="submit"
              >
                {isSubmitting && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                Create account
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-6">
        <div className="relative flex items-center">
          <div className="border-[#383838] flex-grow border-t"></div>
          <span className="text-[#a6a6a6] leadning-none mx-2 flex-shrink text-sm font-normal ">
            Or continue with
          </span>
          <div className="border-[#383838] flex-grow border-t"></div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2 md:flex-row">
        <SocialAuthButton />
      </div>

      <div className="mt-10 flex h-full flex-col justify-end text-xs">
        <div className="flex flex-col text-sm gap-2">
          <div className="flex gap-1">
            <p className="text-[#a6a6a6]">Already have an account?</p>
            <Link className="text-[#fcfcfd] hover:underline" href="/login">
              Sign in
            </Link>
          </div>
          <div className="text-[#a6a6a6] ">
            By proceeding, you agree to our&nbsp;
            <Link
              className="text-[#fcfcfd] hover:underline"
              target="_blank"
              href="#"
            >
              <span>Terms</span>
            </Link>
            &nbsp; and&nbsp;
            <Link
              className="text-[#fcfcfd] hover:underline"
              target="_blank"
              href="#"
            >
              <span>Privacy Policy</span>
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
