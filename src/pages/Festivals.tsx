import { useMemo } from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useGetFestivalData } from "../hooks/useGetFestivals";
import { festivalProps } from "../types/festival";

const Festivals = () => {
  const { data, isLoading } = useGetFestivalData();

  // Group festivals by month_bs using useMemo to optimize the computation
  const groupedFestivals = useMemo(() => {
    if (!data) return [];

    const grouped = data.reduce((acc: any, festival: festivalProps) => {
      if (!acc[festival.month_bs]) {
        acc[festival.month_bs] = [];
      }
      acc[festival.month_bs].push(festival);
      return acc;
    }, {});

    // Convert the grouped object into an array of objects
    return Object.keys(grouped).map((month) => ({
      month_name: month,
      festivals: grouped[month],
    }));
  }, [data])

  return (
    <div className="flex w-full px-2 justify-center items-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="">
          {groupedFestivals.map(({ month_name, festivals }) => (
            <div key={month_name}  className=" my-8 p-4 rounded-lg">
              <h2 className="font-semibold text-indigo-900 text-2xl mb-4 w-full text-start border-b border-b-indigo-900">{month_name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                  festivals?.map((festival: festivalProps) => {
                    return (
                      <div key={festival?.name_np} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 ">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-indigo-900 ">{festival?.name_np}</h5>
                        <p className="font-normal text-gray-700 ">{festival?.description}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Festivals;

//  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {
//             data?.map((festival:festivalProps) => {
//               return (
//                 <div key={festival?.name_np} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 ">
//                   <h5 className="mb-2 text-xl font-bold tracking-tight text-indigo-900 ">{festival?.name_np}</h5>
//                   <p className="font-normal text-gray-700 ">{festival?.description}</p>
//                 </div>
//               )
//             })
//           }
//          </div> 
