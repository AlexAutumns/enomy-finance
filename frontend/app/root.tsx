import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    NavLink,
} from "react-router";

import React, { useState, useEffect } from "react";

import type { Route } from "./+types/root";
import "./app.css";

import BackToTop from "./routes/navigation/BackToTop";

import { FaUser } from "react-icons/fa";

export const links: Route.LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [loggedUser, setLoggedUser] = useState(null)

    const buttonClass =
        "py-2 px-4 rounded-full transition duration-300 ease-in-out";
    const primaryStyle =
        "bg-[#3282B8] text-white hover:bg-[#BBE1FA] hover:text-[#3282B8]";
    const navLinkClass =
        "hover:text-[#BBE1FA] transition duration-300 ease-in-out";

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/currency-converter", label: "Currency Converter" },
        {
            path: `/investment-plan-calculator/${isLoggedIn}`,
            label: "Investment Plan Calculator",
        },
    ];

    return (
        <div className="h-full">
            {/* Navigation Bar */}
            <nav className="sticky top-0 w-full flex justify-between items-center p-4 bg-gray-800 text-white shadow-lg">
                <NavLink
                    to="/"
                    className="flex items-center text-3xl font-bold"
                >
                    <span className="text-[#3282B8]">Enomy</span>
                    <span className="text-[#BBE1FA] font-SpaceGrotesk">
                        Finance
                    </span>
                </NavLink>
                <div className="flex items-center space-x-10">
                    <ul className="flex space-x-5">
                        {navItems.map(({ path, label }) => (
                            <li key={path}>
                                <NavLink to={path} className={navLinkClass}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                        {isLoggedIn && (
                            <li>
                                <NavLink
                                    to="/dashboard/transactions"
                                    className={navLinkClass}
                                >
                                    Transactions
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <div className="flex space-x-5">
                        {!isLoggedIn ? (
                            <NavLink
                                to="/signup"
                                className={`${buttonClass} ${primaryStyle}`}
                            >
                                Sign Up
                            </NavLink>
                        ) : (
                            <NavLink
                                to="/profile"
                                className={`${buttonClass} ${primaryStyle}`}
                            >
                                <FaUser />
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>

            {/* Output of Routes */}
            <Outlet />

            {/* Back To Top Button */}
            <BackToTop />
        </div>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
