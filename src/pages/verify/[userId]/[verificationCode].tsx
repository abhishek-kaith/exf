import { useMutation } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Layout from "../../../components/layout";
import { verifyUserFn } from "../../../data/api/authApi";
import { siteLinks } from "../../../data/siteInfo";
import { StandardResponse } from "../../../data/types/common";

function Verify() {
  const router = useRouter();
  const userId = router.query["userId"] as string;
  const verificationCode = router.query["verificationCode"] as string;
  const { mutate, isError } = useMutation({
    mutationFn: (input: { userId: string; verificationCode: string }) =>
      verifyUserFn(input),
    onSuccess: async (data) => {
      toast.success(data.message);
      await router.push(siteLinks.login);
    },
    onError: (error: AxiosError<StandardResponse>) => {
      if (!error.response?.data.message) {
        return null;
      }
      if (Array.isArray(error.response?.data.message)) {
        toast.error("Unknow Error");
      } else {
        if (error.response?.data.message) {
          toast.error(error.response.data.message);
        }
      }
    },
  });
  useEffect(() => {
    if (router.isReady) {
      mutate({ userId, verificationCode });
    }
  }, [router.isReady, mutate, userId, verificationCode]);
  return (
    <Layout>
      <div className="mx-auto max-w-xl p-4">
        <div className="rounded bg-white px-3 py-9 dark:bg-gray-900">
          <h1 className="text-center text-3xl">
            {!isError ? "Verifying User..." : "Verification Failed"}
          </h1>
        </div>
      </div>
    </Layout>
  );
}

export default Verify;
