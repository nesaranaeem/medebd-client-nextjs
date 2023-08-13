import { useEffect, useState } from "react";
import MedicineDetails from "@/components/medicine/MedicineDetails";
import { apiBaseURL } from "@/utils/api/Api";

async function getDetails(id) {
  const response = await fetch(`${apiBaseURL}medicine/${id}`);
  const data = await response.json();
  return data;
}

function extractIdFromParams(params) {
  if (!params) return null; // Handle the case when params is undefined
  const parts = params.split("-");
  const lastPart = parts[parts.length - 1];
  const id = parseInt(lastPart, 10);
  return id;
}

export async function getServerSideProps({ params }) {
  const id = extractIdFromParams(params?.id); // Use optional chaining to handle undefined params

  try {
    if (id !== null) {
      const medicine = await getDetails(id);
      const { details } = medicine;

      return {
        props: {
          details: details || null, // Ensure that details is not undefined
        },
      };
    }
  } catch (error) {
    console.error("Error fetching medicine details:", error);
  }

  return {
    props: {
      details: null,
    },
  };
}

export default function MedicineDetailsPage({ details }) {
  return (
    <>
      <MedicineDetails details={details} key={details?.brand_id} />{" "}
      {/* Use optional chaining here as well */}
    </>
  );
}
