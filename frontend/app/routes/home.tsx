import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Enomy Finance" },
    { name: "description", content: "Welcome to Enomy Finance" },
  ];
}

export default function Home() {
  return <div>Home</div>;
}
