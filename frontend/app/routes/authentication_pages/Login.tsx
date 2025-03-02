import React from 'react'

export default function Login() {
  return (
    <div>Login</div>
  )
}


// import { data, redirect } from "react-router";
// import type { Route } from "./+types/Login";

// import {
//     getSession,
//     commitSession,
// } from "../../services/authentication/sessions.server";

// export async function loader({ request }: Route.LoaderArgs) {
//     const session = await getSession(request.headers.get("Cookie"));

//     if (session.has("userId")) {
//         // Redirect to dashboard if already signed in

//         return redirect("/dashboard");
//     }

//     return data(
//         { error: session.get("error") },
//         { headers: { "Set-Cookie": await commitSession(session) } }
//     );
// }

// export async function action({ request }: Route.ActionArgs) {
//     const session = await getSession(request.headers.get("Cookie"));

//     const form = await request.formData();
//     const username = form.get("username");
//     const password = form.get("password");

//     const userId = await validateCredentials(username, password);

//     if (userId == null) {
//         session.flash("error", "Invalid username / password");

//         // redirect to login page with errors
//         return redirect("/login", {
//             headers: {
//                 "Set-Cookie": await commitSession(session),
//             },
//         });
//     }

//     session.set("userId", userId);

//     // Login succeeded, send them to the dashboard.
//     return redirect("/dashboard", {
//         headers: { "Set-Cookie": await commitSession(session) },
//     });
// }

// export default function Login({ loaderData }: Route.ComponentProps) {
//     const { error } = loaderData;

//     return (
//         <div>
//             {error ? <div className="error">{error}</div> : null}
//             <form method="POST">
//                 <div>
//                     <p>Please sign in</p>
//                 </div>
//                 <label>
//                     Username: <input type="text" name="username" />
//                 </label>
//                 <label>
//                     Password: <input type="password" name="password" />
//                 </label>
//             </form>
//         </div>
//     );
// }
