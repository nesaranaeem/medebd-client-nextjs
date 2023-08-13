import Statistics from "@/components/statistics/Statistics";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Explore Medicine Details"
        description="MedeBD offers over 25k+ medicine details for free of cost"
      />
      <Statistics />
    </>
  );
}
