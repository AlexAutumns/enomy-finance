import React from "react";
import { NavLink } from "react-router"; // Kept react-router as requested
import type { Route } from "./+types/home";

// Icon Imports
import { FaCalculator, FaChartLine } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";

// Meta function for setting page title and description
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Enomy Finance" },
        { name: "description", content: "Welcome to Enomy Finance" },
    ];
}




// Home component
const Home = () => {
    // List of services with their paths and labels
    const services = [
        { name: "Currency Converter", icon: <MdCurrencyExchange /> },
        { name: "Investment Plan Calculator", icon: <FaCalculator /> },
        { name: "Portfolio Management", icon: <FaChartLine /> },
    ];

    return (
        <div className="bg-[#222831] text-[#EEEEEE]">
            {/* Intro Section */}
            <section id="intro" className="text-center py-16 bg-[#1B262C]">
                <h2 className="text-4xl font-semibold text-[#BBE1FA] mb-4">
                    Welcome to Enomy Finance
                </h2>
                <p className="text-lg text-[#BBE1FA]">
                    Your trusted partner in mortgages, savings, and investments.
                </p>
            </section>

            {/* Services Section */}
            <section
                id="services"
                className="py-16 bg-[#0F4C75] flex flex-col justify-center items-center text-center"
            >
                <h2 className="text-3xl font-semibold text-[#EEEEEE] mb-8">
                    Our Services
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-lg text-[#BBE1FA] max-w-4xl mx-auto">
                    {services.map(({ name, icon }) => (
                        <li
                            key={name}
                            className="py-6 px-6 bg-[#1B262C] border-2 border-[#BBE1FA] rounded-lg flex items-center justify-start space-x-6 shadow-lg transition-all duration-300 ease-in-out transform hover:bg-[#3282B8] hover:text-white hover:border-[#3282B8] hover:shadow-2xl hover:scale-[1.1] cursor-pointer"
                        >
                            <span className="text-4xl">{icon}</span>
                            <span className="text-xl font-semibold">
                                {name}
                            </span>
                        </li>
                    ))}
                </ul>
                <NavLink to="signup">
                    <button className="mt-8 px-8 py-3 text-[#222831] bg-[#BBE1FA] rounded-lg hover:bg-[#3282B8] hover:text-white transition-all duration-300">
                        Get Started
                    </button>
                </NavLink>
            </section>
        </div>
    );
};

export default Home;
