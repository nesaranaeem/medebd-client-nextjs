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

async function getImageData(details) {
  try {
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    const brandNameForURL = details?.brand_name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\d+/g, "")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .replace(/-+$/g, "");
    const strengthForURL = details?.strength
      .replace(/\s+/g, "-")
      .replace(/([0-9]+)([a-zA-Z]+)/, "$1-$2");

    const response = await fetch(
      `${apiBaseURL}image/${brandNameForURL}-${strengthForURL}?apikey=${apikey}`
    );

    if (response.ok) {
      const imageUrl = await response.json();
      return imageUrl;
    } else {
      console.error("Error fetching image:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

function extractIdFromParams(params) {
  if (!params) return null;
  const parts = params.split("-");
  const lastPart = parts[parts.length - 1];
  const id = parseInt(lastPart, 10);
  return id;
}

export async function getServerSideProps({ params }) {
  const id = extractIdFromParams(params?.id);

  try {
    if (id !== null) {
      const medicine = await getDetails(id);
      const { details } = medicine;

      const imageData = await getImageData(details);

      return {
        props: {
          details: details,
          imageData: imageData, // Include imageData as a prop
        },
      };
    }
  } catch (error) {
    console.error("Error fetching medicine details:", error);
  }

  return {
    props: {
      details: null,
      imageData: null, // Provide a default value for imageData
    },
  };
}

export default function MedicineDetailsPage({ details, imageData }) {
  const [isLoading, setIsLoading] = useState(details === null);

  useEffect(() => {
    if (details === null) {
      setIsLoading(true);
      return;
    }
  }, [details]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin h-16 w-16 text-indigo-500" />
      </div>
    );
  }

  return (
    <>
      <MedicineDetails
        details={details}
        imageData={imageData} // Pass imageData as a prop
        key={details?.brand_id}
      />
    </>
  );
}
