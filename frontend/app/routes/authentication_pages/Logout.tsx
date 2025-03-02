import { getSession, destroySession } from "../../services/authentication/sessions.server";
import type { Route } from "./+types/Logout";

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"));
    return redirect("/login", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}

export default function LogoutRoute() {
    return (
        <>
            <p>Are you sure you want to log out?</p>
            <Form method="post">
                <button>Logout</button>
            </Form>
            <Link to="/">Never mind</Link>
        </>
    );
}
