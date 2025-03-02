import React from "react";

import { Outlet, NavLink } from "react-router";

const User = () => {
    return (
        <div>
            User <Outlet />
        </div>
    );
};

export default User;
