import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(
        typeof window !== "undefined" &&
            sessionStorage.getItem("isLoggedIn") === "true"
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const storedIsLoggedIn =
                sessionStorage.getItem("isLoggedIn") === "true";
            if (storedIsLoggedIn !== isLoggedIn) {
                setIsLoggedIn(storedIsLoggedIn);
            }
        }, 1000); // Check every 1000ms

        return () => clearInterval(interval);
    }, [isLoggedIn]);

    const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <nav className="sticky top-0 w-full flex justify-between items-center p-4 bg-gradient-to-br from-[#1B262C] to-[#0F4C75] text-white shadow-lg">
            <NavLink to="/" className="flex items-center text-3xl font-bold">
                <span className="text-[#3282B8]">Enomy</span>
                <span className="text-[#BBE1FA] font-SpaceGrotesk">
                    Finance
                </span>
            </NavLink>
            <div className="flex items-center space-x-10">
                <ul className="flex space-x-5">
                    <li>
                        <NavLink to="/" className="hover:text-[#BBE1FA]">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/currency-converter"
                            className="hover:text-[#BBE1FA]"
                        >
                            Currency Converter
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/investment-plan-calculator"
                            className="hover:text-[#BBE1FA]"
                        >
                            Investment Plan Calculator
                        </NavLink>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <NavLink
                                to="/transactions"
                                className="hover:text-[#BBE1FA]"
                            >
                                Transactions
                            </NavLink>
                        </li>
                    )}
                </ul>

                {!isLoggedIn ? (
                    <div className="flex space-x-5">
                        <NavLink
                            to="/signup"
                            className="py-2 px-4 rounded-full bg-[#3282B8] text-white hover:bg-[#BBE1FA] hover:text-[#3282B8] hover:font-semibold"
                        >
                            Sign Up
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="py-2 px-4 rounded-full bg-[#3282B8] text-white hover:bg-[#BBE1FA] hover:text-[#3282B8] hover:font-semibold"
                        >
                            Login
                        </NavLink>
                    </div>
                ) : (
                    <div className="flex space-x-5">
                        <NavLink
                            to="/profile"
                            className="p-4 rounded-full bg-[#3282B8] text-white hover:bg-[#BBE1FA] hover:text-[#3282B8] hover:font-semibold justify-center items-center"
                        >
                            <FaUser />
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className="py-2 px-4 rounded-full bg-[#3282B8] text-white hover:bg-[#BBE1FA] hover:text-[#3282B8] hover:font-semibold"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
