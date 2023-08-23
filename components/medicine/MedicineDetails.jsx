import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import {
  FaInfo,
  FaPrescriptionBottleMedical,
  FaBuildingCircleCheck,
  FaBox,
  FaLungs,
  FaMoneyBill1Wave,
  FaSuperpowers,
  FaSpinner,
} from "react-icons/fa6";
import GenericDetails from "./GenericDetails";
import { BreadcrumbJsonLd, ImageJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import { apiBaseURL } from "@/utils/api/Api";

const MedicineDetails = ({ details }) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const [imageData, setImageData] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true); // State for loading image

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const brandNameForURL = details?.brand_name
          .toLowerCase()
          .replace(/\s+/g, "-") // Convert spaces to hyphens
          .replace(/\d+/g, "") // Remove numeric characters
          .replace(/[^a-zA-Z0-9-]/g, "") // Remove non-alphanumeric characters
          .replace(/-+$/g, ""); // Remove trailing hyphens
        const strengthForURL = details?.strength
          .replace(/\s+/g, "-") // Convert spaces to hyphens
          .replace(/([0-9]+)([a-zA-Z]+)/, "$1-$2"); // Add hyphen between number and letters
        const response = await fetch(
          `${apiBaseURL}image/${brandNameForURL}-${strengthForURL}?apikey=${apikey}`
        );
        const data = await response.json();
        if (data.status) {
          setImageData(data);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [details?.brand_name, details?.strength, apikey]);
  const handleImageLoad = () => {
    setLoadingImage(false);
  };
  return (
    <>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Home",
            item: "https://medebd.com/",
          },
          {
            position: 2,
            name: "Medicines",
            item: "https://medebd.com/medicines",
          },
          {
            position: 3,
            name: `${details?.brand_name} ${details.form} ${details.strength}`,
            item: `https://medebd.com/medicine/${details?.brand_name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}-${details.brand_id}`,
          },
        ]}
      />
      <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-800 text-white shadow-md w-full mx-auto">
        <div className="flex items-center justify-center h-6 w-6 bg-indigo-100 rounded-full mb-2">
          <FaInfo className="h-4 w-4 text-indigo-500" />
        </div>
        <div className="text-xl font-bold text-center text-white">
          Medicine Details
        </div>

        {details ? (
          <div className="mt-4">
            <Transition
              show={details !== null}
              enter="transition-opacity ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              {imageData?.status ? (
                <>
                  <NextSeo
                    title={`${details?.brand_name} ${details?.form} ${details?.strength} - Indications | Doses | Pharmacology | Side Effects And More`}
                    description={`${details?.brand_name} ${details?.form} ${
                      details?.strength
                    }  Price is ${
                      details?.price
                    } BDT. ${details?.generic_details[0].indication.slice(
                      0,
                      140
                    )}... `}
                    openGraph={{
                      images: [
                        {
                          url: imageData?.imageURL, // Set the image URL if status is true
                          width: 300, // Adjust the width as needed
                          height: 200, // Adjust the height as needed
                          alt: `${details?.brand_name} ${details?.strength}`,
                        },
                      ],
                    }}
                  />
                  <ImageJsonLd
                    url={imageData?.imageURL}
                    width={300} // Adjust the width as needed
                    height={200} // Adjust the height as needed
                    alt={`${details?.brand_name} ${details?.strength}`}
                  />
                </>
              ) : (
                <>
                  <NextSeo
                    title={`${details?.brand_name} ${details?.form} ${details?.strength} - Indications | Doses | Pharmacology | Side Effects And More`}
                    description={`${details?.brand_name} ${details?.form} ${
                      details?.strength
                    }  Price is ${
                      details?.price
                    } BDT. ${details?.generic_details[0].indication.slice(
                      0,
                      140
                    )}... `}
                  />
                </>
              )}

              <nav
                className="flex my-2 px-5 py-3 bg-gray-600 text-white rounded-lg mx-auto w-full md:w-6/12"
                aria-label="Breadcrumb"
              >
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <Link
                      href="/"
                      className="inline-flex items-center text-sm font-medium text-white hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      <svg
                        className="w-3 h-3 mr-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                      </svg>
                      Home
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 mx-1 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <Link
                        href="/medicines"
                        className="ml-1 text-sm font-medium text-white hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                      >
                        Medicines
                      </Link>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 mx-1 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <span className="ml-1 text-sm font-medium text-white md:ml-2 dark:text-gray-400">
                        {details?.brand_name} {details?.form}{" "}
                        {details?.strength}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
              <div className="bg-gray-800 mx-auto border border-gray-200 rounded-lg shadow p-4 max-w-md">
                <>
                  <h1 className="text-lg md:text-2xl text-center font-bold text-white mb-2 md:mb-2">
                    {details?.brand_name} {details?.strength}
                  </h1>
                  {/* Conditional rendering of Image */}
                  {imageData?.status ? (
                    <div className="relative">
                      {loadingImage && (
                        <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                          <FaSpinner className="animate-spin h-8 w-8 text-indigo-500" />
                        </div>
                      )}
                      <Image
                        src={imageData.imageURL}
                        alt={`${details?.brand_name} ${details?.strength}`}
                        width={300} // Adjust the width as needed
                        height={200} // Adjust the height as needed
                        layout="fixed"
                        className="mx-auto object-cover rounded-lg mb-2"
                        onLoad={handleImageLoad} // Call the handleImageLoad function when the image loads
                      />
                    </div>
                  ) : (
                    // Show a message if the image status is false
                    <></>
                  )}

                  <div className="space-y-2 md:space-y-3 text-white">
                    {/* Form */}
                    <div className="flex items-center border-2 border-gray-500 p-3">
                      <FaPrescriptionBottleMedical className="text-yellow-400 md:text-lg" />
                      <span className="font-bold ml-3">Form:</span>
                      <span className="font-sans text-base md:text-lg ml-1">
                        {details.form}
                      </span>
                    </div>
                    {/* Generic */}
                    <div className="flex items-center border-2 border-gray-500 p-3">
                      <FaLungs className="text-purple-400 md:text-lg" />
                      <span className="font-bold ml-3">Generic:</span>
                      <Link
                        href={`/medicines/generics/${parseInt(
                          details?.generic_details[0].generic_id
                        )}`}
                        className="text-blue-400 hover:text-blue-800 underline ml-1"
                      >
                        <span className="font-sans text-base md:text-lg">
                          {details?.generic_details[0].generic_name}
                        </span>
                      </Link>
                    </div>
                    {/* Packsize */}
                    <div className="flex items-center border-2 border-gray-500 p-3">
                      <FaBox className="text-green-400 md:text-lg" />
                      <span className="font-bold ml-3">Pack Size:</span>
                      <span className="font-sans text-base md:text-lg ml-1">
                        {details.packsize}
                      </span>
                    </div>

                    {/* Company */}
                    <div className="flex items-center border-2 border-gray-500 p-3">
                      <FaBuildingCircleCheck className="text-blue-400 md:text-lg" />
                      <span className="font-bold ml-3">Company:</span>

                      <span className="font-sans text-base md:text-lg">
                        {details.company_name}
                      </span>
                    </div>

                    {/* Unit Price */}
                    <div className="flex items-center border-2 border-gray-500 p-3">
                      <FaMoneyBill1Wave className="text-pink-400 md:text-lg" />
                      <span className="font-bold ml-3">Unit Price:</span>
                      <span className="font-sans text-base md:text-lg ml-1">
                        ৳{details.price}
                      </span>
                    </div>

                    {/* Strength */}
                    <div className="flex items-center border-2 border-gray-500 p-3">
                      <FaSuperpowers className="text-purple-400 md:text-lg" />
                      <span className="font-bold ml-3">Strength:</span>
                      <span className="font-sans text-base md:text-lg ml-1">
                        {details.strength}
                      </span>
                    </div>
                  </div>
                </>
              </div>
            </Transition>
            <div className="bg-gray-800 mx-auto border border-gray-200 rounded-lg shadow p-4 my-3 w-full">
              <div className="space-y-2 md:space-y-3 text-white">
                {details.generic_details.map((generic, index) => (
                  <GenericDetails generic={generic} key={index} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <FaSpinner className="animate-spin h-8 w-8 text-indigo-500" />
        )}
      </div>
    </>
  );
};

export default MedicineDetails;
