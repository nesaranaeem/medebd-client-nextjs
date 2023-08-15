import { useEffect, useState } from "react";
import MedicineDetails from "@/components/medicine/MedicineDetails";
import { apiBaseURL } from "@/utils/api/Api";
import { FaSpinner } from "react-icons/fa6";

async function getDetails(id) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(`${apiBaseURL}medicine/${id}?apikey=${apikey}`);
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
          details: details, // Ensure that details is not undefined
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
  const [isLoading, setIsLoading] = useState(details === null);

  useEffect(() => {
    if (details === null) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);
  }, [details]);

  if (isLoading) {
    return (
      <>
        <FaSpinner className="animate-spin h-8 w-8 text-indigo-500" />
      </>
    );
  }

  return (
    <>
      <MedicineDetails details={details} key={details?.brand_id} />
    </>
  );
}
