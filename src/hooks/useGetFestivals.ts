import { useQuery } from "@tanstack/react-query";
import Axios from "../apis/axiosConfig";

const fetchFestivalData = async () => {
  const {data} = await Axios.get(`data/NepaliFestivals.json`);
  console.log('The festivals are ', data);
  return data;
};

export const useGetFestivalData = () => {
  return useQuery({
    queryKey: ["festivals"],
    queryFn: () => fetchFestivalData(),
    staleTime: Infinity,  
    // enabled: !!year && !!month, // Only fetch when year & month exist
  });
};

