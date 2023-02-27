import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { toast } from "react-hot-toast";
import { checkout } from "../../../data/api/authApi";
import { CheckOutInput } from "../../../data/schema";
import { siteLinks } from "../../../data/siteInfo";
import { authStore } from "../../../data/store";
import { StandardResponse } from "../../../data/types/common";

const PricingCard = ({
  isDisabled,
  mode,
  pricing,
  desc,
  monthlyPriceId,
  annualPriceId,
  isAnnual,
  children,
}: {
  isDisabled: boolean;
  mode: string;
  pricing: number;
  desc: string;
  monthlyPriceId: string;
  annualPriceId: string;
  isAnnual: boolean;
  children?: ReactNode;
}) => {
  const { isLogedIn } = authStore();
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: (data: CheckOutInput) => checkout(data),
    onError: (error: AxiosError<StandardResponse>) => {
      if (!error.response?.data.message) return;
      toast.error(error.response.data.message);
    },
    onSuccess: async (data) => {
      await router.push(data.message);
    },
  });
  return (
    <div className="w-full space-y-2 rounded-md bg-white px-5 py-6 shadow-sm dark:bg-gray-900 ">
      <h3 className="text-2xl font-semibold text-brand">{mode}</h3>
      <h5 className="text-3xl font-medium text-gray-800 dark:text-gray-200">
        {pricing === 0 ? "Free" : `$ ${pricing}`}
      </h5>
      <p>{desc}</p>
      <div className="space-y-1">{children}</div>
      <button
        disabled={isDisabled || isLoading}
        onClick={() => {
          if (!isLogedIn) {
            router.push(siteLinks.login).catch((e)=>{console.log(e)});
            return;
          }
          const priceId = isAnnual ? annualPriceId : monthlyPriceId;
          if (priceId === "") return;
          mutate({
            proudctPriceId: priceId,
          });
        }}
        className="flex h-12 w-full items-center justify-center rounded bg-brand text-lg font-semibold text-white disabled:brightness-75"
      >
        {isLoading ? "Creating Payment Url" : "Get Started"}
      </button>
    </div>
  );
};

export default PricingCard;
