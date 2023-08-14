import { useState, useEffect } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { apiBaseURL } from "@/utils/api/Api";
import DoctorCard from "@/components/doctor/DoctorCard";
import { useRouter } from "next/router";

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const response = await fetch(`${apiBaseURL}doctor?page=${page}&limit=12`);
  const data = await response.json();

  return {
    props: {
      doctorsList: data.doctorsList,
      currentPage: Number(page),
      totalPages: data.total_pages,
      totalResults: data.total_count,
    },
  };
}

export default function DoctorsPage({
  doctorsList,
  currentPage,
  totalPages,
  totalResults,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <NextSeo
        title={`Doctors | ${
          currentPage < 1 ? "" : `Page ${currentPage} of ${totalPages} |`
        } Total ${totalResults} Doctors`}
        description={`Browse Doctor from the total ${totalResults} doctors.`}
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-center py-2">
            <h1 className="text-xl text-center font-bold p-3 text-white border-2 border-gray-500">
              Doctors List
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
            {doctorsList?.map((item) => (
              <DoctorCard key={item._id} doctor={item} />
            ))}
          </div>
          <div className="flex flex-col items-center py-4">
            <div className="flex space-x-2">
              {currentPage > 1 && (
                <Link
                  href={`?page=${currentPage - 1}`}
                  className="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg"
                >
                  &lt;&lt;
                </Link>
              )}
              {currentPage > 2 && (
                <Link
                  href={`?page=${currentPage - 2}`}
                  className="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg"
                >
                  {currentPage - 2}
                </Link>
              )}
              {currentPage > 1 && (
                <Link
                  href={`?page=${currentPage - 1}`}
                  className="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg"
                >
                  {currentPage - 1}
                </Link>
              )}
              <button className="px-5 py-2.5 bg-blue-500 text-white font-bold rounded-lg">
                {currentPage}
              </button>
              {currentPage < totalPages && (
                <Link
                  href={`?page=${currentPage + 1}`}
                  className="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg"
                >
                  {currentPage + 1}
                </Link>
              )}
              {currentPage < totalPages - 1 && (
                <Link
                  href={`?page=${currentPage + 2}`}
                  className="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg"
                >
                  {currentPage + 2}
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`?page=${currentPage + 1}`}
                  className="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg"
                >
                  &gt;&gt;
                </Link>
              )}
            </div>
            <p className="mt-2 text-white">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </>
      )}
    </>
  );
}
