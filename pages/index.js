import { NextSeo } from "next-seo";
import Statistics from "@/components/statistics/Statistics";
import { apiBaseURL } from "@/utils/api/Api";
import MedicineCard from "@/components/medicine/MedicineCard";
import { useState, useEffect } from "react";
import Link from "next/link";

export async function getServerSideProps() {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(
    `${apiBaseURL}medicine?apikey=${apikey}&page=1&limit=12`
  );
  const data = await response.json();

  return {
    props: {
      medicineData: data.details,
    },
  };
}

export default function Home({ medicineData }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <NextSeo
        title="Explore Medicine Details"
        description="MedeBD offers over 25k+ medicine details for free of cost"
      />
      <Statistics />
      {isLoading ? (
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-center py-2">
            <h1 className="text-xl text-center font-bold p-3 text-white border-2 border-gray-500">
              Medicine Price In Bangladesh
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
            {medicineData?.map((item) => (
              <MedicineCard key={item._id} medicine={item} />
            ))}
          </div>
          <div className="flex justify-center py-4">
            <Link
              href="/medicines"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
            >
              View All
            </Link>
          </div>
        </>
      )}
    </>
  );
}
