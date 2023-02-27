import { Switch } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import Layout from "../components/layout";
import CostCalculator from "../components/screen/home/CostCalc";
import { siteLinks } from "../data/siteInfo";
import { authStore } from "../data/store";
function Pricing() {
  const p = [
    {
      plan: "Basic",
      pricing: 0,
      desc: "For the light Excel or Google Sheets user. It's everything you need to try it out. ",
    },
    {
      plan: "Premium",
      pricing: 1.99,
      desc: "For the daily Excel or Google Sheets user looking to work faster & smarter.",
    },
    {
      plan: "Business",
      pricing: 3.99,
      desc: "For teams looking to receive discounted pricing for 5+ seats. Standard pricing for 1-4 seats.",
    },
  ];
  const [plans, setPlans] = useState(p);
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  function handleIsAnnual() {
    if (!isAnnual) {
      const newPlans = plans.map((p) => {
        return { plan: p.plan, pricing: p.pricing * 12, desc: p.desc };
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
      <section className="container mx-auto px-5 py-7">
        <div className="mb-10 text-center">
          <h1 className="title-font mb-4 text-3xl font-bold capitalize text-primary dark:text-gray-200 sm:text-3xl md:text-4xl">
            Pricing
          </h1>
          <p className="mx-auto text-base leading-relaxed lg:w-3/4 xl:w-2/4">
            Turn your spreadsheet problem into a formula in seconds
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 text-lg font-semibold">
          <div className={!isAnnual ? "text-brand" : ""}>Monthly</div>
          <Toggle toogleState={isAnnual} setToogleState={handleIsAnnual} />
          <div className={isAnnual ? "text-brand" : ""}>Yearly</div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-3 py-5 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            return (
              <PricingCard
                key={plan.plan}
                mode={plan.plan}
                pricing={plan.pricing}
                desc={plan.desc}
              />
            );
          })}
        </div>
      </section>
      <CostCalculator />
    </Layout>
  );
}
const PricingCard = ({
  mode,
  pricing,
  desc,
}: {
  mode: string;
  pricing: number;
  desc: string;
}) => {
  const {isLogedIn}= authStore()
  return (
    <div className="w-full space-y-2 rounded-md bg-white px-5 py-6 shadow-sm dark:bg-gray-900 md:h-[420px]">
      <h3 className="text-2xl font-semibold text-brand">{mode}</h3>
      <h5 className="text-3xl font-medium text-gray-800 dark:text-gray-200">
        {pricing === 0 ? "Free" : `$ ${pricing}`}
      </h5>
      <p>{desc}</p>
      <div className="space-y-1">
        <ListItem text="Five formula requests per month" />
        <ListItem text="Generate formulas, explain formulas, generate VBA and regex, receive instructions on Excel tasks" />
        <ListItem text="Web access" />
        <ListItem text="Access all previous requests" />
      </div>
      <Link
        href={isLogedIn ? siteLinks.billing : siteLinks.login }
        className="flex h-12 w-full items-center justify-center rounded bg-brand text-lg font-semibold text-white"
      >
        Get Started 
      </Link>
    </div>
  );
};

const ListItem = ({ text }: { text: string }) => {
  return (
    <div className="flex text-lg font-medium">
      <TiTick className="h-6 w-6 flex-shrink-0 text-2xl text-brand" />
      <span>{text}</span>
    </div>
  );
};
const Toggle = ({
  toogleState,
  setToogleState,
}: {
  toogleState: boolean;
  setToogleState: () => void;
}) => {
  return (
    <Switch
      checked={toogleState}
      onChange={setToogleState}
      className={`${toogleState ? "bg-brand" : "bg-teal-800"}
  relative inline-flex h-[30px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${toogleState ? "translate-x-9" : "translate-x-0"}
    pointer-events-none inline-block h-[26px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};
export default Pricing;
