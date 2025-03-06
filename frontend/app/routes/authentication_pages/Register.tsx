import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        displayName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "USER",
        accountStatus: "ACTIVE", // Change to be pending before Email authentication
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError("");

        try {
            const payload = {
                name: formData.displayName,
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                role: formData.role,
                accountStatus: formData.accountStatus,
            };

            const response = await axios.post(
                "http://localhost:8080/users/add",
                payload
            );

            if (response.status === 201) {
                alert("Registration successful!");
                navigate("/login");
            } else {
                setError(response.data?.message || "Registration failed.");
            }
        } catch (error) {
            setError(
                error.response?.data?.message || "An unexpected error occurred."
            );
        }
    };

    const formatLabel = (field) => {
        const label = field
            .replace(/([A-Z])/g, " $1")
            .trim()
            .replace(/\b\w/g, (char) => char.toUpperCase());

        return field === "phone" ? (
            <span>
                {label} <span className="text-gray-500">(Optional)</span>
            </span>
        ) : (
            <span>
                <span className="text-red-600">*</span> {label}
            </span>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Register
                </h2>
                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                        "displayName",
                        "username",
                        "email",
                        "phone",
                        "password",
                        "confirmPassword",
                    ].map((field) => (
                        <div key={field}>
                            <label
                                htmlFor={field}
                                className="block text-gray-700 font-semibold mb-1"
                            >
                                {formatLabel(field)}
                            </label>
                            <input
                                type={
                                    field === "email"
                                        ? "email"
                                        : field
                                              .toLowerCase()
                                              .includes("password")
                                        ? "password"
                                        : "text"
                                }
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                            />
                        </div>
                    ))}

                    <p className="text-gray-600 text-sm text-center">
                        By registering, you agree to our{" "}
                        <NavLink
                            to=""
                            className="text-blue-500 font-medium hover:underline"
                        >
                            Terms and Services
                        </NavLink>
                        .
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
