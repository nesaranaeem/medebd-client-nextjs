const GenericDetails = ({ generic }) => {
  return (
    <>
      <div className="flex items-start p-3 w-full">
        <div className="mr-3 text-indigo-500 text-lg mt-1" />
        <span className="font-sans text-lg ">
          {generic.indication && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">General Indication:</span>{" "}
              {generic.indication}
            </p>
          )}
          {generic.indication_bangla && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">সাধারণ নির্দেশিকা:</span>{" "}
              {generic.indication_bangla}
            </p>
          )}
          {generic.contra_indication && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">Contra Indication:</span>{" "}
              {generic.contra_indication}
            </p>
          )}
          {generic.contra_indication_bangla && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">প্রতিলক্ষণ:</span>{" "}
              {generic.contra_indication_bangla}
            </p>
          )}
          {generic.dose && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">Dose:</span> {generic.dose}
              <i className="text-sm">
                ** Take medicine as per doctor{"'"}s guidelines
              </i>
            </p>
          )}
          {generic.dose_bangla && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">ডোজ:</span> {generic.dose_bangla}
              <i className="text-sm">
                ** চিকিৎসকের পরামর্শ অনুযায়ী ঔষধ সেবন করুন
              </i>
            </p>
          )}
          {generic.side_effect && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">Side Effect:</span>{" "}
              {generic.side_effect}
            </p>
          )}
          {generic.side_effect_bangla && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">পার্শ্ব প্রতিক্রিয়া:</span>{" "}
              {generic.side_effect_bangla}
            </p>
          )}
          {generic.overdose && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">Overdose:</span>{" "}
              {generic.overdose}
            </p>
          )}
          {generic.precaution && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">Precaution:</span>{" "}
              {generic.precaution}
            </p>
          )}
          {generic.precaution_bangla && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">সতর্কতা:</span>{" "}
              {generic.precaution_bangla}
            </p>
          )}
          {generic.pregnancy_category && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">Pregnancy Category:</span>{" "}
              {generic.pregnancy_category}
            </p>
          )}
          {generic.pregnancy_category_bangla && (
            <p className="block rounded-xl border border-gray-800 dark:border-white p-6 shadow-xl transition mb-2">
              <span className="font-bold pr-1">গর্ভকালীন অবস্থা:</span>{" "}
              {generic.pregnancy_category_bangla}
            </p>
          )}
        </span>
      </div>
    </>
  );
};

export default GenericDetails;
