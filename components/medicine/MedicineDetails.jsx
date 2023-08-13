import React from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import {
  FaInfo,
  FaPrescriptionBottleMedical,
  FaBuildingCircleCheck,
  FaBox,
  FaFlask,
  FaMoneyBill1Wave,
  FaSuperpowers,
  FaSpinner,
} from "react-icons/fa6";
import GenericDetails from "./GenericDetails";
import { NextSeo } from "next-seo";

const MedicineDetails = ({ details }) => {
  return (
    <>
      <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-800 text-white shadow-md w-full mx-auto">
        <div className="flex items-center justify-center h-10 w-10 bg-indigo-100 rounded-full mb-2">
          <FaInfo className="h-6 w-6 text-indigo-500" />
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
              <NextSeo
                title={`${details.brand_name} ${details.form} ${details.strength} - Indications | Doses | Pharmacology | Side Effects And More`}
                description={`${details.brand_name} ${details.form} ${
                  details.strength
                }  Price is ${
                  details.price
                } BDT. ${details.generic_details[0].indication.slice(
                  0,
                  140
                )}... `}
              />
              {/* ${details.generic_details[0].contra_indication}.slice(0, 140)}...  */}
              <div className="bg-gray-800 mx-auto border border-gray-200 rounded-lg shadow p-4 max-w-md">
                <>
                  <h1 className="text-lg md:text-2xl text-center font-bold text-white mb-2 md:mb-4">
                    {details.brand_name} {details?.strength}
                  </h1>
                  <div className="space-y-2 md:space-y-3 text-white">
                    {/* Form */}
                    <div className="flex items-start border-2 border-gray-500 p-3">
                      <FaPrescriptionBottleMedical className="mr-3 text-yellow-400 md:text-lg" />
                      <div className="flex flex-col">
                        <span className="font-bold">Form:</span>
                        <span className="font-sans text-base md:text-lg ml-1">
                          {details.form}
                        </span>
                      </div>
                    </div>

                    {/* Packsize */}
                    <div className="flex items-start border-2 border-gray-500 p-3">
                      <FaBox className="mr-3 text-green-400 md:text-lg" />
                      <div className="flex flex-col">
                        <span className="font-bold">Pack Size:</span>
                        <span className="font-sans text-base md:text-lg ml-1">
                          {details.packsize}
                        </span>
                      </div>
                    </div>

                    {/* Company */}
                    <div className="flex items-start border-2 border-gray-500 p-3">
                      <FaBuildingCircleCheck className="mr-3 text-blue-400 md:text-lg" />
                      <div className="flex flex-col">
                        <span className="font-bold">Company:</span>
                        <Link
                          href={`/company/${parseInt(details.company_id)}`}
                          className="text-blue-400 hover:text-blue-800 underline ml-1"
                        >
                          <span className="font-sans text-base md:text-lg">
                            {details.company_name}
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="flex items-start border-2 border-gray-500 p-3">
                      <FaMoneyBill1Wave className="mr-3 text-pink-400 md:text-lg" />
                      <div className="flex flex-col">
                        <span className="font-bold">Unit Price:</span>
                        <span className="font-sans text-base md:text-lg ml-1">
                          ৳{details.price}
                        </span>
                      </div>
                    </div>

                    {/* Strength */}
                    <div className="flex items-start border-2 border-gray-500 p-3">
                      <FaSuperpowers className="mr-3 text-purple-400 md:text-lg" />
                      <div className="flex flex-col">
                        <span className="font-bold">Strength:</span>
                        <span className="font-sans text-base md:text-lg ml-1">
                          {details.strength}
                        </span>
                      </div>
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
