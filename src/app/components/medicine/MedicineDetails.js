"use client"; // This is a client component 👈🏽

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

const MedicineDetails = ({ details }) => {
  return (
    <>
      <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-800 text-white shadow-md w-9/12 lg:w-full md:w-full xl:w-full mx-auto">
        <div className="flex items-center justify-center h-10 w-10 bg-indigo-100 rounded-full mb-2">
          <FaInfo className="h-6 w-6 text-indigo-500" />
        </div>
        <div className="text-xl font-bold text-center text-white">
          Medicine Details
        </div>
        {details ? (
          <div className="mt-4">
            <Transition
              show={details !== null} // Adjust this condition based on your details availability check
              enter="transition-opacity ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <div className="bg-gray-800 mx-auto border border-gray-200 rounded-lg shadow p-6 max-w-md">
                <>
                  <h1 className="text-2xl text-center font-bold text-white mb-4">
                    {details.brand_name} {details?.strength}
                  </h1>
                  <div className="space-y-3 text-white">
                    <div className="flex items-center border-2 border-gray-500 p-3">
                      <FaPrescriptionBottleMedical className="mr-3 text-yellow-400 text-lg" />
                      <span className="font-sans text-lg ">
                        <span className="font-bold pr-1">Form:</span>
                        {details.form}
                      </span>
                    </div>
                    <div className="flex items-center border-2 border-gray-500 p-3">
                      <FaBox className="mr-3 text-green-400 text-lg" />
                      <span className="font-sans text-lg">
                        <span className="font-bold pr-1">Packsize:</span>{" "}
                        {details.packsize}
                      </span>
                    </div>
                    <div className="flex items-center border-2 border-gray-500 p-3">
                      <FaBuildingCircleCheck className="mr-3 text-blue-400 text-lg" />
                      <span className="font-sans text-lg">
                        <span className="font-bold pr-1">Company:</span>
                        <Link
                          href={`/company/${parseInt(details.company_id)}`}
                          className="text-blue-400 underline ml-1"
                        >
                          {details.company_name}
                        </Link>
                      </span>
                    </div>
                    <div className="flex items-center border-2 border-gray-500 p-3">
                      <FaMoneyBill1Wave className="mr-3 text-pink-400 text-lg" />
                      <span className="font-sans text-lg"></span>
                      <span className="font-bold pr-1">Unit Price:</span> ৳
                      {details.price}
                    </div>
                    <div className="flex items-center border-2 border-gray-500 p-3">
                      <FaSuperpowers className="mr-3 text-purple-400 text-lg" />
                      <span className="font-sans text-lg"></span>
                      <span className="font-bold pr-1">Strength:</span>{" "}
                      {details.strength}
                    </div>
                    <div className="flex items-center border-2 border-gray-500 p-3">
                      <FaFlask className="mr-3 text-purple-400 text-lg" />
                      <span className="font-sans text-lg">
                        <span className="font-bold pr-1">Generic Name:</span>{" "}
                        {details.generic_details[0].generic_name}
                      </span>
                    </div>
                  </div>
                </>
              </div>
            </Transition>
            <div className="bg-gray-800 mx-auto border border-gray-200 rounded-lg shadow p-6 my-3 w-full">
              <div className="space-y-3 text-white">
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
