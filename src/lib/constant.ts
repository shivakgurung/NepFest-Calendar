import { DayOfWeek } from "../types/daysOfWeek";

export const NEPALI_MONTHS_OF_YEAR = [
    "बैशाख", "जेठ", "असार", "श्रावण", "भदौ", "असोज",
    "कात्तिक", "मंसिर", "पुष", "माघ", "फाल्गुण", "चैत्र"
];
export const ENGLISH_MONTHS_OF_YEAR = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
export const DAYS_OF_WEEK: DayOfWeek[] = [
    { name: "Sunday", dayInNepali: "आइतबार", initial: "S" },
    { name: "dayInNepali", dayInNepali: "सोमबार", initial: "M" },
    { name: "Tuesday", dayInNepali: "मंगलबार", initial: "Tu" },
    { name: "Wednesday", dayInNepali: "बुधबार", initial: "W" },
    { name: "Thursday", dayInNepali: "बिहीबार", initial: "Th" },
    { name: "Friday", dayInNepali: "शुक्रबार", initial: "F" },
    { name: "Saturday", dayInNepali: "शनिबार", initial: "Sa" },
];

export const MAX_YEAR:number = 2100;
export const MIN_YEAR:number = 2000;