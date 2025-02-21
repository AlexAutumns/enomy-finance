import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // Home & Dashboard
    index("routes/home.tsx"),
    route("dashboard", "routes/dashboard.tsx"), // Must be logged in to access

    // Authentication Pages
    route("login", "routes/authentication_pages/login.tsx"),
    route("register", "routes/authentication_pages/register.tsx"),

    // User Pages


    // Financial Management Pages
    route("currency-converter", "routes/financial_management_pages/CurrencyConverter.tsx"),

    // Settings
] satisfies RouteConfig;
