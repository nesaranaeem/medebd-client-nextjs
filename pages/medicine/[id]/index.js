import { useEffect, useState } from "react";
import MedicineDetails from "@/components/medicine/MedicineDetails";
import MedicineCard from "@/components/medicine/MedicineCard"; // Import the MedicineCard component
import { apiBaseURL } from "@/utils/api/Api";
import { FaSpinner } from "react-icons/fa6";
import Link from "next/link";

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
  const [relatedMedicines, setRelatedMedicines] = useState([]);
  const [showViewAllButton, setShowViewAllButton] = useState(false);
  const [totalRelatedMedicines, setTotalRelatedMedicines] = useState(0);

  useEffect(() => {
    if (details === null) {
      setIsLoading(true);
      return;
    }

    // Fetch related medicines here
    async function fetchRelatedMedicines() {
      setIsLoading(true);

      try {
        const apikey = process.env.NEXT_PUBLIC_API_KEY;
        const response = await fetch(
          `${apiBaseURL}medicine?apikey=${apikey}&genericId=${details.generic_id}&page=1&limit=16`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch related medicines");
        }

        const data = await response.json();
        setRelatedMedicines(data.details.slice(1));
        setShowViewAllButton(data.total_pages > 1);
        setTotalRelatedMedicines(data.total_count);
      } catch (error) {
        console.error("Error fetching related medicines:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRelatedMedicines();
  }, [details]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-3/4 p-2">
        <MedicineDetails
          details={details}
          imageData={imageData}
          key={details?.brand_id}
        />
      </div>

      {/* Right Side */}
      <div className="w-full md:w-3/12 p-1">
        <h3 className="text-lg text-center font-bold p-2 text-white border-2 mb-2 border-gray-500">
          Related Medicines
        </h3>
        {totalRelatedMedicines > 0 ? (
          <p className="text-white text-center my-2">
            Total
            <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              {totalRelatedMedicines}
            </span>
            Medicines Found
          </p>
        ) : (
          <p className="text-white text-center">No related medicines found.</p>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center text-white text-center">
            <FaSpinner className="animate-spin h-8 w-8 text-indigo-500 mr-2" />
            <p>Loading related medicines...</p>
          </div>
        ) : (
          <>
            {totalRelatedMedicines > 0 && (
              <>
                {relatedMedicines.map((medicine) => (
                  <div className="my-2" key={medicine._id}>
                    <MedicineCard medicine={medicine} />
                  </div>
                ))}

                {showViewAllButton && (
                  <Link
                    href={`/medicines/generics/${details.generic_id}`}
                    className="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center my-2"
                  >
                    View All
                  </Link>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
