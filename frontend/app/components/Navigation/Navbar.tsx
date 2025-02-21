import { NavLink } from "react-router";
import { useState } from "react"; // Import useState for managing state

// AuthButtons component within the same file
function AuthButtons({ isLoggedIn }) {
    return (
        <div className="flex space-x-5">
            <NavLink to="/login">
                <span className="bg-[#3282B8] text-white py-2 px-4 rounded-full">
                    Login
                </span>
            </NavLink>
            <NavLink to="/signup">
                <span className="bg-[#3282B8] text-white py-2 px-4 rounded-full">
                    Sign Up
                </span>
            </NavLink>
        </div>
    );
}

export default function MyAppNav() {
    // Example state to track login status
    const [isLoggedIn, setIsLoggedIn] = useState(true) // Change this to be based on authentication logic

    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <NavLink to="/" className="flex items-center text-3xl">
                <span className="text-[#3282B8] font-bold">Enomy</span>
                <span className="text-[#BBE1FA] font-bold font-SpaceGrotesk">
                    Finance
                </span>
            </NavLink>
            <div className="flex items-center space-x-15">
                <nav className="flex space-x-5">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/currency-converter">
                        Currency Converter
                    </NavLink>
                    <NavLink to="/transactions">Transactions</NavLink>
                </nav>
                {/* Use the AuthButtons component */}
                {!isLoggedIn ? (
                    <AuthButtons isLoggedIn={isLoggedIn} />
                ) : (
                    <NavLink to="/Account">
                        <span className="bg-[#3282B8] text-white py-2 px-4 rounded-full">
                            Account
                        </span>
                    </NavLink>
                )}
            </div>
        </div>
    );
}
