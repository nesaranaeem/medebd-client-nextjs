import { IoMdInformationCircle } from "react-icons/io";

const GenericDetails = ({ generic }) => {
  return (
    <div className="space-y-4">
      {generic.indication && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">General Indication:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.indication}
          </p>
        </div>
      )}
      {generic.indication_bangla && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">সাধারণ নির্দেশিকা:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.indication_bangla}
          </p>
        </div>
      )}
      {/* Repeat similar pattern for other fields */}
      {generic.contra_indication && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">Contra Indication:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.contra_indication}
          </p>
        </div>
      )}
      {generic.contra_indication_bangla && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">প্রতিলক্ষণ:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.contra_indication_bangla}
          </p>
        </div>
      )}
      {generic.dose && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">Dose:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.dose}
            <br></br>
            <i className="text-sm">
              ** Take medicine as per doctor{"'"}s guidelines
            </i>
          </p>
        </div>
      )}
      {generic.dose_bangla && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">ডোজ:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.dose_bangla}
            <br></br>
            <i className="text-sm">
              ** চিকিৎসকের পরামর্শ অনুযায়ী ঔষধ সেবন করুন
            </i>
          </p>
        </div>
      )}
      {generic.side_effect && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">Side Effect:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.side_effect}
          </p>
        </div>
      )}
      {generic.side_effect_bangla && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">পার্শ্ব প্রতিক্রিয়া:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.side_effect_bangla}
          </p>
        </div>
      )}
      {generic.overdose && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">Overdose:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.overdose}
          </p>
        </div>
      )}
      {generic.precaution && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">Precaution:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.precaution}
          </p>
        </div>
      )}
      {generic.precaution_bangla && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">সতর্কতা:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.precaution_bangla}
          </p>
        </div>
      )}
      {generic.pregnancy_category && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">Pregnancy Category:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.pregnancy_category}
          </p>
        </div>
      )}
      {generic.pregnancy_category_bangla && (
        <div className="p-4 shadow-xl transition">
          <div className="flex items-center bg-gray-600 p-2 rounded-xl">
            <IoMdInformationCircle className="mr-3 text-white text-lg" />
            <p className="font-bold text-white">গর্ভকালীন অবস্থা:</p>
          </div>
          <p className="text-base font-medium mt-2 bg-gray-400 p-4 rounded-xl text-black">
            {generic.pregnancy_category_bangla}
          </p>
        </div>
      )}
    </div>
  );
};

export default GenericDetails;
