import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { RxArrowRight } from 'react-icons/rx'
import FormInput from '../components/common/Input'
import Layout from '../components/layout'
import { forgetPassFn } from '../data/api/authApi'
import { ForgetPasswordInput, forgetPasswordSchema } from '../data/schema'
import { StandardResponse } from '../data/types/common'

function ForgetPassword() {

const methods = useForm<ForgetPasswordInput>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const router = useRouter();
  const { reset, handleSubmit } = methods;
  const { mutate: forgetPassword, isLoading } = useMutation(
    (input: ForgetPasswordInput) => forgetPassFn(input),
    {
      onSuccess: async () => {
        reset();
        toast.success("Recover Mail Send to your email");
        await router.push("/");
      },
      onError(error: AxiosError<StandardResponse>) {
        if (!error.response?.data.message) return;
        toast.error(error.response.data.message);
      },
    }
  );
  const onSubmitHandler: SubmitHandler<ForgetPasswordInput> = (values) => {
    forgetPassword(values);
  };
  return (
  <Layout>
      <div className="mx-auto max-w-xl p-4">
        <div className="rounded bg-white px-6 py-9 dark:bg-gray-900">
          <h1 className="text-center text-3xl">Forget Password</h1>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(
                onSubmitHandler as SubmitHandler<FieldValues>
              )}
            >
              <FormInput
                label="Email"
                name="email"
                placeholder="joe@example.com"
              />
              <button
                disabled={isLoading}
                type="submit"
                className="flex w-full items-center justify-center rounded bg-brand py-2 text-sm text-white transition duration-150 ease-in hover:brightness-110 focus:outline-none disabled:brightness-50 sm:text-base"
              >
                <span className="mr-2 uppercase">Send</span>
                <span>
                  <RxArrowRight className="text-xl" />
                </span>
              </button>
            </form>
          </FormProvider>
          <p className="text-center">
            A recover email wll be devlivered on this email address{" "}
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default ForgetPassword
