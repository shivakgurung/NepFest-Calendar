import {  Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Festivals from "../pages/Festivals";
import DateConverter from "../pages/DateConverter";
import MyEvents from "../pages/MyEvents";

const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/festivals" element={<Festivals />} />
                <Route path="/my-events" element={<MyEvents />} />
                <Route path="/convert-date" element={<DateConverter />} />
            </Routes>
        
    );
};

export default AppRoutes;
