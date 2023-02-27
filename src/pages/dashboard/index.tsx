import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Layout from "../../components/screen/dashboard/layout/Layout";
import PastRequestCard from "../../components/screen/dashboard/PastRequest";
import ProductCard from "../../components/screen/dashboard/ProductCard";
import StatCard from "../../components/screen/dashboard/StatCard";
import { getTasks, getUsage } from "../../data/api/authApi";
import { siteLinks } from "../../data/siteInfo";
import { authStore } from "../../data/store";

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["usage"],
    queryFn: getUsage,
  });
  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  const { user } = authStore();
  return (
    <Layout>
      {!user?.isSubscribed && (
        <div className="m-3 flex flex-wrap items-center justify-between rounded bg-brand p-2 text-lg text-white">
          <h3>Subscribe to our plan and get unlimited formulas</h3>
          <Link
            className="rounded bg-white px-3 py-2 text-black"
            href={siteLinks.billing}
          >
            Subscribe
          </Link>
        </div>
      )}
      <div className="m-3 space-y-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            title="Formula Generator"
            link={siteLinks.genrateFormula}
            desc={
              "Quickly generate complex Excel or Google Sheets formulas with just a few clicks using natural language text instructions."
            }
            buttonText="Genrate Formulas Now"
          />
          <ProductCard
            title="Formula Explainer"
            link={siteLinks.explainFormula}
            desc="Get a detailed breakdown of how each formula works, making it easy for even novice users to understand and use."
            buttonText="Get Explanation Now"
          />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Usage</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StatCard
              colorCode="#4CAF50"
              stat={data?.usage.all || 0}
              title="Generations All Time"
            />
            <StatCard
              colorCode="#CBBB2D"
              stat={data?.usage.monthly || 0}
              title="Generations This Month"
            />
            <StatCard
              colorCode="#C96F2E"
              stat={
                (data?.usage.monthly !== 0
                  ? 10
                  : 0 - (data?.usage.monthly || 0)) <= 0
                  ? 0
                  : data?.usage.monthly || 0 - 10
              }
              title="Generations Remaining This Month"
            />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Past Requests</h2>
          <div className="space-y-2">
            {tasks?.map((task) => {
              const date = new Date(task.updatedAt);
              return (
                <PastRequestCard
                  key={task.id}
                  source={task.source}
                  input={task.input}
                  output={task.output}
                  date={date.toISOString()}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
