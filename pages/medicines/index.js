import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { apiBaseURL } from "@/utils/api/Api";
import MedicineCard from "@/components/medicine/MedicineCard";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { page = 1 } = context.query;
  const response = await fetch(`${apiBaseURL}medicine?page=${page}&limit=12`);
  const data = await response.json();

  return {
    props: {
      medicineData: data.details || [],
      totalCount: data.total_count || 0,
      totalPages: data.total_pages || 0,
      currentPage: data.current_page || 0,
    },
  };
}

export default function MedicinesPage({
  medicineData,
  totalCount,
  totalPages,
  currentPage,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handlePageChange = (newPageNumber) => {
    setCurrentPageNumber(newPageNumber);
  };

  const itemsPerPage = 12;
  const indexOfLastItem = currentPageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = medicineData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <NextSeo
        title="Explore Medicine Details"
        description="MedeBD offers over 25k+ medicine details for free of cost"
      />

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
            {currentItems.map((item) => (
              <MedicineCard key={item._id} medicine={item} />
            ))}
          </div>
          <div className="flex justify-center py-2">
            {currentPageNumber > 1 && (
              <Link
                href={`/medicines?page=${currentPageNumber - 1}`}
                className={`mx-1 px-2 py-1 rounded-md bg-gray-300 text-black`}
              >
                Previous
              </Link>
            )}
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              const isCurrent = pageNumber === currentPageNumber;
              const isFirst = pageNumber === 1;
              const isLast = pageNumber === totalPages;

              if (
                (isFirst && currentPageNumber <= 4) ||
                (isLast && currentPageNumber >= totalPages - 3) ||
                (pageNumber >= currentPageNumber - 2 &&
                  pageNumber <= currentPageNumber + 2)
              ) {
                return (
                  <Link
                    key={index}
                    href={`/medicines?page=${pageNumber}`}
                    className={`mx-1 px-2 py-1 rounded-md ${
                      isCurrent
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              } else if (
                (isFirst && currentPageNumber > 4) ||
                (isLast && currentPageNumber < totalPages - 3)
              ) {
                return (
                  <span
                    key={index}
                    className="mx-1 px-2 py-1 rounded-md bg-gray-300 text-black"
                  >
                    ...
                  </span>
                );
              }
            })}
            {currentPageNumber < totalPages && (
              <Link
                href={`/medicines?page=${currentPageNumber + 1}`}
                className={`mx-1 px-2 py-1 rounded-md bg-gray-300 text-black`}
              >
                Next
              </Link>
            )}
          </div>
          <p className="text-center py-2 text-white">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, totalCount)} of {totalCount} items
          </p>
        </>
      )}
    </>
  );
}
