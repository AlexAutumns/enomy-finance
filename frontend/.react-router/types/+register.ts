import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/login": {};
  "/signup": {};
  "/logout": {};
  "/dashboard": {};
  "/profile": {};
  "/portfolio": {};
  "/transactions": {};
  "/currency-converter": {};
  "/investment-plan-calculator/:isLoggedIn": {
    "isLoggedIn": string;
  };
};