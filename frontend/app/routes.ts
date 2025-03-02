import {
    type RouteConfig,
    index,
    route,
    layout,
} from "@react-router/dev/routes";

export default [
    // Home & Dashboard
    index("routes/home.tsx"),

    // Authentication Pages
    route("login", "routes/authentication_pages/Login.tsx"),
    route("signup", "routes/authentication_pages/Register.tsx"),
    route("logout", "routes/authentication_pages/Logout.tsx"),

    // Dashboard, Personal Info, Transactions, Settings
    layout("routes/user_pages/User.tsx", [
        route("dashboard", "routes/user_pages/Dashboard.tsx"),
        route("profile", "routes/user_pages/Profile.tsx"),
        route("portfolio", "routes/user_pages/Portfolio.tsx"),
        route(
            "transactions",
            "routes/financial_management_pages/Transactions.tsx"
        ),
    ]),

    // Financial Management Pages
    route(
        "currency-converter",
        "routes/financial_management_pages/CurrencyConverter.tsx"
    ),
    route(
        "investment-plan-calculator/:isLoggedIn",
        "routes/financial_management_pages/investment_plan_calculator/InvestmentPlanCalculator.tsx"
    ),
] satisfies RouteConfig;
