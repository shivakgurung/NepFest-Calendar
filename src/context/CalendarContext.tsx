import { createContext, useContext, useState } from "react";
import { ADToBS } from "bikram-sambat-js";

// Define the shape of our context state
interface CalendarContextType {
  currentNepaliDate: { year: number; month: number; day: number };
  selectedYearMonth: { year: number; month: number };
  setSelectedYearMonth:  React.Dispatch<React.SetStateAction<{
    year: number;
    month: number;
}>>;
}

// Create Context with a default undefined value
const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

// Create a Provider Component
export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  // Convert the current date to the Nepali calendar
  
  const todayBS = ADToBS(new Date().toISOString().split("T")[0]);
  const [currentNepaliDate] = useState({
    year: parseInt(todayBS.split("-")[0]),
    month: parseInt(todayBS.split("-")[1]),
    day: parseInt(todayBS.split("-")[2]),
  });

  // User-selected date (defaults to current year/month)
  const [selectedYearMonth, setSelectedYearMonth] = useState<{ year: number; month: number }>({
    year: currentNepaliDate.year,
    month: currentNepaliDate.month,
  });
  

  return (
    <CalendarContext.Provider value={{ currentNepaliDate, selectedYearMonth, setSelectedYearMonth }}>
      {children}
    </CalendarContext.Provider>
  );
};

// Custom Hook to use this Context
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
