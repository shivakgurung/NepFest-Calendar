import { useEffect, useMemo, useState } from "react";
import { MIN_YEAR, NEPALI_MONTHS_OF_YEAR } from "../lib/constant";
import { ADToBS, BSToAD } from "bikram-sambat-js";

const DateConverter = () => {
  const [AD, setAD] = useState("");
  const [BS, setBS] = useState({
    year: 2081,
    month: 1,
    day: 1,
  });
  const years = useMemo(() => Array.from({ length: 21 }, (_, i) => MIN_YEAR + i), []);
  const days = useMemo(() => Array.from({ length: 32 }, (_, i) => 1 + i), []);

  useEffect(() => {
    if (AD) {
      const convertedBS = ADToBS(AD);
      const [year, month, day] = convertedBS.split("-").map(Number);
      setBS({ year, month, day });
    }
  }, [AD]);

  useEffect(() => {
    const bsDate = `${BS.year}-${String(BS.month).padStart(2, "0")}-${String(BS.day).padStart(2, "0")}`;
    const convertedAD = BSToAD(bsDate);
    setAD(convertedAD);
  }, [BS]);

  const handleADChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAD(e.target.value);
  };

  const handleBSChange = (field: string, value: number) => {
    setBS((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex justify-start flex-col min-h-[80vh]">
      <h6 className="text-indigo-900 text-xl font-semibold">Date Converter</h6>

      <div className="flex-col items-center sm:flex sm:justify-center my-8 gap-x-6">
        <div className=" flex justify-center sm:block" >
          <form className="flex">
            <select
              id="year"
              value={BS.year}
              onChange={(e) => handleBSChange("year", Number(e.target.value))}
              className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={BS.month}
              onChange={(e) => handleBSChange("month", Number(e.target.value))}
              id="month"
              className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
            >
              {NEPALI_MONTHS_OF_YEAR.map((month, i) => (
                <option key={i} value={i + 1}>{month}</option>
              ))}
            </select>

            <select
              id="day"
              value={BS.day}
              onChange={(e) => handleBSChange("day", Number(e.target.value))}
              className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
            >
              {days.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </form>
        </div>
        <div className="flex justify-center my-6 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
          </svg>


        </div>

        <div className="text-indigo-900">
          <input
            value={AD}
            // readOnly={true}
            onKeyDown={(e) => e.preventDefault()}
            type="date"
            id="date_ad"
            name="Date(A.D)"
            onChange={handleADChange}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default DateConverter;
