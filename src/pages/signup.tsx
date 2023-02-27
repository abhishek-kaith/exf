import Link from "next/link";
import React from "react";
import {
  FormProvider,
  type SubmitHandler,
  useForm,
  type FieldValues,
} from "react-hook-form";
import { BiUser } from "react-icons/bi";
import { RxArrowRight } from "react-icons/rx";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput, registerSchema } from "../data/schema";
import FormInput from "../components/common/Input";
import Layout from "../components/layout";
import { useMutation } from "@tanstack/react-query";
import { signUpUserFn } from "../data/api/authApi";
import { useRouter } from "next/router";
import { siteLinks } from "../data/siteInfo";
import { toast } from "react-hot-toast";
import { StandardResponse } from "../data/types/common";
import { AxiosError } from "axios";

function Signup() {
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });
  const { reset, handleSubmit } = methods;
  const { mutate, isLoading } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: (input: RegisterInput) => signUpUserFn(input),
    onSuccess: async (data) => {
      toast.success(data.message);
      await router.push(siteLinks.login);
      reset();
    },
    onError: (error: AxiosError<StandardResponse>) => {
      if (!error.response) return;
      toast.error(error.response.data.message);
    },
  });
  const onSubmit = (data: RegisterInput) => {
    mutate(data);
  };
  return (
    <Layout>
      <section className="mx-auto w-full max-w-lg">
        <div className="my-8 mx-2 rounded bg-white py-8 px-8 shadow-sm dark:bg-gray-900">
          <h1 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-100">
            Register
          </h1>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
            >
              <FormInput
                label="Full Name"
                name="userName"
                placeholder="John Doe"
              />
              <FormInput
                label="Email"
                name="email"
                placeholder="user@example.com"
                type="email"
              />
              <FormInput label="Password" name="password" type="password" />
              <FormInput
                label="Confirm Password"
                name="passwordConfirm"
                type="password"
              />
              <button
                disabled={isLoading}
                type="submit"
                className="flex w-full items-center justify-center rounded bg-brand py-2 text-sm text-white transition duration-150 ease-in hover:brightness-110 focus:outline-none disabled:brightness-50 sm:text-base"
              >
                <span className="mr-2 uppercase">Register</span>
                <span>
                  <RxArrowRight className="text-xl" />
                </span>
              </button>
            </form>
          </FormProvider>
          <div className="mt-6 flex items-center justify-center">
            <Link
              href="/login"
              className="inline-flex items-center text-center text-xs font-bold text-brand hover:brightness-110"
            >
              <span>
                <BiUser className="text-xl" />
              </span>
              <span className="ml-2">Already have an account?</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Signup;
