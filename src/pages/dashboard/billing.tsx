import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Layout from "../../components/screen/dashboard/layout/Layout";
import PricingCard from "../../components/screen/pricing/PricingCard";
import Toggle from "../../components/screen/pricing/Toggle";
import { cancelSubs, getMeFn, getSubscription } from "../../data/api/authApi";
import { authStore } from "../../data/store";
const p = [
  {
    plan: "Premium",
    pricing: 4.99,
    desc: "For the daily Excel or Google Sheets user looking to work faster & smarter.",
    pricing_monthly: "price_1MbIbTSFFUOHWmIP7RSFEJCs",
    pricing_yearly: "price_1MbjwKSFFUOHWmIPAk1n6r3O",
    isDisabled: false,
  },
  {
    plan: "Business",
    pricing: 4.66,
    desc: "For teams looking to receive discounted pricing for 5+ seats. Standard pricing for 1-4 seats.",
    pricing_monthly: "",
    pricing_yearly: "",
    isDisabled: true,
  },
];
function Billing() {
  const { user } = authStore();
  const [plans, setPlans] = useState(p);
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { setCredentials } = authStore();
  const { data, refetch } = useQuery({
    queryFn: getSubscription,
    queryKey: ["sub"],
  });
  const cancleSub = useMutation({
    mutationKey: ["cancelSub"],
    mutationFn: cancelSubs,
    onSuccess: async () => {
      await refetch();
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      const user = await queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: getMeFn,
      });
      setCredentials(user.data);
    },
  });
  function handleIsAnnual() {
    if (!isAnnual) {
      const newPlans = plans.map((p) => {
        return {
          plan: p.plan,
          pricing: p.pricing * 12,
          desc: p.desc,
          isDisabled: p.isDisabled,
          pricing_monthly: p.pricing_monthly,
          pricing_yearly: p.pricing_yearly,
        };
      });
      setPlans(newPlans);
      setIsAnnual(true);
      return;
    } else {
      setPlans(p);
      setIsAnnual(false);
      return;
    }
  }
  return (
    <Layout>
      {!user?.isSubscribed ? (
        <section className="p-3">
          <div className="mb-5 text-center">
            <h2 className="mb-5 text-3xl text-primary dark:text-gray-300">
              Billing
            </h2>
            <div className="flex items-center justify-center gap-3 text-lg font-semibold">
              <div className={!isAnnual ? "text-brand" : ""}>Monthly</div>
              <Toggle toogleState={isAnnual} setToogleState={handleIsAnnual} />
              <div className={isAnnual ? "text-brand" : ""}>Yearly</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {plans.map((plan, idx) => {
              return (
                <PricingCard
                  key={idx}
                  isDisabled={plan.isDisabled}
                  desc={plan.desc}
                  mode={plan.plan}
                  pricing={plan.pricing}
                  annualPriceId={plan.pricing_yearly}
                  monthlyPriceId={plan.pricing_monthly}
                  isAnnual={isAnnual}
                />
              );
            })}
          </div>
        </section>
      ) : (
        <section className="p-3">
          <h2>Active Subscription</h2>
          <div className="mt-5 w-fit space-y-2 rounded bg-white p-4 dark:bg-gray-900">
            <h3>{data?.method}</h3>
            <p>{data?.status}</p>
            <button
              disabled={cancleSub.isLoading}
              onClick={() => {
                cancleSub.mutate();
              }}
              className="rounded bg-gray-100 px-3 py-2 dark:bg-gray-800"
            >
              {cancleSub.isLoading ? "mutating..." : "Cancle Subscription"}{" "}
            </button>
          </div>
        </section>
      )}
    </Layout>
  );
}

export default Billing;
