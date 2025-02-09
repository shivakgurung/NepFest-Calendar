import { useQuery } from "@tanstack/react-query";
import Axios from "../apis/axiosConfig";

const fetchMonthData = async (year: number, month: number) => {
  const {data} = await Axios.get(`data/${year}/${month}.json`);
  console.log('The festival for the month are ', data);
  return data;
};

export const useGetMonthData = (year: number, month: number) => {
  return useQuery({
    queryKey: ["calendar", year, month],
    queryFn: () => fetchMonthData(year, month),
    staleTime: Infinity,  
    enabled: !!year && !!month, // Only fetch when year & month exist
  });
};

