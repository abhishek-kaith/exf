import { type NextPage } from "next";
import Head from "next/head";
import Faq from "../components/Faq";
import Layout from "../components/layout";
import CostCalculator from "../components/screen/home/CostCalc";
import Features from "../components/screen/home/Features";
import Hero from "../components/screen/home/Hero";
import Models from "../components/screen/home/Models";
import Steps from "../components/screen/home/Steps";
import { info } from "../data/siteInfo";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{info.siteName}</title>
        <meta
          name="description"
          content="Get Excel formula and much more easily"
        />
      </Head>
      <Layout>
        <Hero />
        {/*   <div id="feature">
          <Feature
            imageScr="/home/formula-problem.png"
            headingOne="Problem"
            headingTwo="Formula"
            text="Turn your spreadsheet problem into a formula in seconds"
          />
          <Feature
            imageScr="/home/formula-explain.png"
            headingOne="Problem"
            headingTwo="Explain"
            text="Turn your spreadsheet problem into a formula in seconds"
          />
        </div>*/}
        <Steps />
        <Features />
        <Models />
        <CostCalculator />
        <Faq />
      </Layout>
    </>
  );
};

export default Home;
