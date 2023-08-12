import MedicineDetails from "@/app/components/medicine/MedicineDetails";
import { apiBaseURL } from "@/app/components/utils/api/Api";

async function getDetails(id) {
  const response = await fetch(`${apiBaseURL}medicine/${id}`, {
    next: {
      revalidation: 60,
    },
  });
  const data = await response.json();
  return data;
}

function extractIdFromParams(params) {
  const parts = params.split("-");
  const lastPart = parts[parts.length - 1];
  const id = parseInt(lastPart, 10);
  return id;
}

export default async function MedicineDetailsPage({ params }) {
  // Extract the ID from the params
  const id = extractIdFromParams(params.id);

  // Fetch medicine details using the extracted ID
  const medicine = await getDetails(id);

  const { details } = medicine;

  return (
    <>
      <MedicineDetails details={details} key={details?.brand_id} />
    </>
  );
}
