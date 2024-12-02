import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import CustomButton from "../../components/CustomButton/index.jsx";
import {Link, useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../components/Firebase";

import { signOut } from "firebase/auth";


const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const methods = useForm({ mode: "onBlur" });

    const navigate = useNavigate();

    const handleSignIn = async (data) => {
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            alert("Sign-in successful!");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                // Handle specific error
            }
            console.error("Sign-in error:", error);
            alert("User is not registered, please sign up first!");
        } finally {
            setLoading(false);
        }
    };





    const handleSignOut = async () => {
        try {
            await signOut(auth);
            alert("You have been logged out successfully!");
            navigate("/signin"); // Redirect to the sign-in page
        } catch (error) {
            console.error("Error logging out:", error.message);
            alert("Error logging out: " + error.message);
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
                       <CustomButton
                            onClick={handleSignOut}
                            title={"Sign Out"}
                            color="black"
                            size="18"

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
