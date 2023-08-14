import Link from "next/link";
import {
  FaPills,
  FaBuilding,
  FaMoneyBillWave,
  FaInfoCircle,
} from "react-icons/fa";

const MedicineCard = ({ medicine }) => {
  const formattedName = medicine?.brand_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  const link = `/medicine/${formattedName}-${medicine?.brand_id}`;
  const brandName = medicine?.brand_name;
  const truncatedBrandName =
    brandName?.length > 34 ? brandName.slice(0, 34) + "..." : brandName;
  const genericName = medicine?.generic_details[0]?.generic_name;
  const truncatedGenericName =
    genericName?.length > 34 ? genericName.slice(0, 34) + "..." : genericName;

  const priceString = medicine?.price.replace(",", " and ৳"); // Replacing commas with "and" in the price

  return (
    <div className="border border-gray-700 rounded-lg bg-gray-800 text-white shadow-md hover:bg-gray-900 p-4">
      <div className="flex items-center mb-2">
        <FaPills className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-semibold" title={brandName}>
          {truncatedBrandName}
        </h2>
      </div>
      <div className="mb-2 flex items-center border-2 border-gray-500 p-1">
        <FaInfoCircle className="h-4 w-4 mr-2" />
        <p>{medicine?.form}</p>
      </div>
      <div className="mb-2 flex items-center border-2 border-gray-500 p-1">
        <FaMoneyBillWave className="h-4 w-4 mr-2" />
        <p>Price: ৳{priceString}</p>
      </div>
      <div className="mb-2 flex items-center border-2 border-gray-500 p-1">
        <FaBuilding className="h-4 w-4 mr-2" />
        <p>Company: {medicine?.company_name}</p>
      </div>
      <div className="mb-4 flex items-center border-2 border-gray-500 p-1">
        <FaPills className="h-4 w-4 mr-2" />
        <p>
          Generic: <span title={genericName}>{truncatedGenericName}</span>
        </p>
      </div>
      <Link
        href={link}
        className="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
      >
        View Details
      </Link>
    </div>
  );
};

export default MedicineCard;
