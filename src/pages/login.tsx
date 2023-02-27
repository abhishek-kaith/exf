import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { BiUserPlus } from "react-icons/bi";
import { RxArrowRight } from "react-icons/rx";
import FormInput from "../components/common/Input";
import Layout from "../components/layout";
import { loginUserFn } from "../data/api/authApi";
import { LoginInput, loginSchema } from "../data/schema";
import { siteLinks } from "../data/siteInfo";
import { authStore } from "../data/store";
import { StandardResponse } from "../data/types/common";

function Login() {
  const router = useRouter();
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const { setIsLogIn } = authStore();

  const { reset, handleSubmit } = methods;

  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginInput) => loginUserFn(userData),
    {
      onSuccess: async (data) => {
        toast.success(data.message);
        reset();
        setIsLogIn(true);
        await router.push(siteLinks.dashboard);
      },
      onError(error: AxiosError<StandardResponse>) {
        if (!error.response) return;
        toast.error(error.response.data.message);
      },
    }
  );

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };
  return (
    <Layout>
      <section className="mx-auto w-full max-w-lg">
        <div className="my-8  mx-2 rounded bg-white py-8 px-8 shadow-sm dark:bg-gray-900">
          <h1 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-100">
            Welcome Back
          </h1>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(
                onSubmitHandler as SubmitHandler<FieldValues>
              )}
            >
              <FormInput
                label="Email"
                name="email"
                placeholder="user@example.com"
                type="email"
              />
              <FormInput label="Password" name="password" type="password" />
              <div className="mb-3 -mt-3 flex justify-end">
                <Link
                  href={"/forget-password"}
                  className="text-brand hover:brightness-110"
                >
                  Forget Password
                </Link>
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="flex w-full items-center justify-center rounded bg-brand py-2 text-sm text-white transition duration-150 ease-in hover:brightness-110 focus:outline-none disabled:brightness-50 sm:text-base"
              >
                <span className="mr-2 uppercase">Login</span>
                <span>
                  <RxArrowRight className="text-xl" />
                </span>
              </button>
            </form>
          </FormProvider>
          <div className="mt-6 flex items-center justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center text-center text-xs font-bold text-brand hover:brightness-110"
            >
              <span>
                <BiUserPlus className="text-2xl" />
              </span>
              <span className="ml-2">Create New Account</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Login;
