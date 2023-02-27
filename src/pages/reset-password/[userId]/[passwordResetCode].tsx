import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { RxArrowRight } from "react-icons/rx";
import FormInput from "../../../components/common/Input";
import Layout from "../../../components/layout";
import { IResetPassword, resetPassFn } from "../../../data/api/authApi";
import {
  forgetPassBodySchema,
  ForgetPassInputBody,
} from "../../../data/schema";
import { StandardResponse } from "../../../data/types/common";

function PasswordReset() {
  const router = useRouter();
  const userId = router.query["userId"] as string;
  const passwordResetCode = router.query["passwordResetCode"] as string;
  const methods = useForm({
    resolver: zodResolver(forgetPassBodySchema),
    mode: "all",
  });
  const { reset, handleSubmit } = methods;
  const { mutate, isLoading } = useMutation({
    mutationFn: (input: IResetPassword) => {
      return resetPassFn(input);
    },
    onSuccess: async (data) => {
      reset();
      await router.push("/login");
      toast.success(data.message);
    },
    onError(error: AxiosError<StandardResponse>) {
      if (!error.response?.data.message) return;
      toast.error(error.response.data.message);
    },
  });
  const onSubmit: SubmitHandler<ForgetPassInputBody> = (data) => {
    mutate({
      body: data,
      params: {
        passwordResetCode,
        userId,
      },
    });
  };
  return (
    <Layout>
      <div className="mx-auto max-w-xl p-4">
        <div className="rounded bg-white px-3 py-9 dark:bg-gray-900">
          <h1 className="text-center text-3xl">Reset Password</h1>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
            >
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
                <span className="mr-2 uppercase">Reset Password</span>
                <span>
                  <RxArrowRight className="text-xl" />
                </span>
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </Layout>
  );
}

export default PasswordReset;
