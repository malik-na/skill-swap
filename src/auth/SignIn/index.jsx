import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import CustomButton from "../../components/CustomButton/index.jsx";
import {Link} from "react-router-dom";

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const methods = useForm({ mode: "onBlur" });

    const handleSignIn = async (data) => {
        setLoading(true);

        try {
            const response = await fetch("https://your-backend-api.com/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error:", errorData);
                alert("Sign-in failed: " + errorData.message);
                return;
            }

            const responseData = await response.json();
            console.log("Sign-in successful:", responseData);
            alert("Sign-in successful!");

            // Redirect to dashboard or home page
            // window.location.href = "/dashboard";
        } catch (error) {
            console.error("Sign-in error:", error);
            alert("An error occurred during sign-in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-[100svh] bg-[#F7F7F7] text-black font-body">
            <h2 className="text-4xl font-bold mb-8">Sign In</h2>
            <div
                className="flex flex-col justify-between w-1/2 bg-white p-8 rounded-lg shadow-md"
                style={{ minHeight: "400px" }}
            >
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(handleSignIn)}
                        className="flex flex-col gap-5"
                    >
                        <h3 className="text-3xl font-bold mb-5">Welcome Back!</h3>
                        <input
                            {...methods.register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email",
                                },
                            })}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 border-gray-300 border-[1px] rounded"
                        />
                        <input
                            {...methods.register("password", {
                                required: "Password is required",
                            })}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-2 border-gray-300 border-[1px] rounded"
                        />
                        <CustomButton
                            type="submit"
                            title={loading ? "Signing In..." : "Sign In"}
                            color="black"
                            size="18"
                            disabled={loading}
                        />
                    </form>
                </FormProvider>
                <p className="mt-5 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-blue hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
