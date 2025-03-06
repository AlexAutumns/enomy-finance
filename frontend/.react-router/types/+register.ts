import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/login": {};
  "/logout": {};
  "/signup": {};
  "/dashboard": {};
  "/profile": {};
  "/portfolio": {};
  "/transactions": {};
  "/currency-converter": {};
  "/investment-plan-calculator": {};
};