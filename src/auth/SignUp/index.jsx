import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomButton from "../../components/CustomButton/index.jsx";
import {Link, useNavigate} from "react-router-dom";
import {doc, setDoc} from "firebase/firestore"
import {useAuth} from "../AuthContext/index.jsx";
import { auth, db } from "../../components/Firebase";


const SignUp = () => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const methods = useForm({ mode: "onBlur" });
    const { signUp } = useAuth();

    const skillOptions = [
        { value: "graphicDesign", label: "Graphic Design" },
        { value: "webDevelopment", label: "Web Development" },
        { value: "contentWriting", label: "Content Writing" },
        { value: "digitalMarketing", label: "Digital Marketing" },
    ];

    const languageOptions = [
        { value: "english", label: "English" },
        { value: "spanish", label: "Spanish" },
        { value: "french", label: "French" },
        { value: "german", label: "German" },
        { value: "chinese", label: "Chinese" },
    ];

    const navigate = useNavigate();

    const handleNext = (data) => {
        if (step < 4) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (data) => {
        const allData = {
            ...data,
            selectedDate: selectedDate ? selectedDate.toISOString() : null,
        };

        try {
            const { user } = await signUp(data.email, data.password); // Get the user object
            await setDoc(doc(db, "users", user.uid), allData); // Save to Firestore

            alert("User successfully created and data saved!");
            navigate("/signin");
        } catch (error) {
            console.error("Error during sign-up:", error);
            alert("Error creating user: " + error.message);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h3 className="text-3xl font-bold mb-5">Step 1: Basic Info</h3>
                        <input
                            {...methods.register("fullName", { required: "Full name is required" })}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-2 border-gray-300 border-[1px] rounded"
                        />
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
                                minLength: { value: 6, message: "Password must be at least 6 characters long" },
                            })}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-2 border-gray-300 border-[1px] rounded"
                        />
                        <input
                            {...methods.register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === methods.getValues("password") || "Passwords do not match",
                            })}
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full p-2 border-gray-300 border-[1px] rounded"
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <h3 className="text-3xl font-bold mb-5">Step 2: Skills Offered</h3>
                        <Controller
                            name="skillsOffered"
                            control={methods.control}
                            rules={{ required: "Select at least one skill" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={skillOptions}
                                    isMulti
                                    placeholder="Type or select a skill"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            )}
                        />
                    </>
                );
            case 3:
                return (
                    <>
                        <h3 className="text-3xl font-bold mb-5">Step 3: Skills Needed</h3>
                        <Controller
                            name="skillsNeeded"
                            control={methods.control}
                            rules={{ required: "Select at least one skill" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={skillOptions}
                                    isMulti
                                    placeholder="Type or select a skill"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            )}
                        />
                    </>
                );
            case 4:
                return (
                    <>
                        <h3 className="text-3xl font-bold mb-5">Step 4: Preferences</h3>
                        <label className="block mb-2 font-semibold">Time Availability</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            showTimeSelect
                            dateFormat="Pp"
                            placeholderText="Select a date and time"
                            className="w-full p-2 border-gray-300 border-[1px] rounded"
                        />
                        <label className="block mt-4 mb-2 font-semibold">Preferred Language</label>
                        <Controller
                            name="preferredLanguage"
                            control={methods.control}
                            rules={{ required: "Select at least one language" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={languageOptions}
                                    isMulti
                                    placeholder="Select your preferred language(s)"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            )}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-[100svh] bg-[#F7F7F7] text-black font-body">
            <h2 className="text-4xl font-bold mb-8">Sign Up Process</h2>
            <div className="flex w-2/4 justify-evenly mb-10">
                {[1, 2, 3, 4].map((item) => (
                    <span
                        key={item}
                        className={`min-w-24 h-3 px-2 text-[0px] rounded-lg ${
                            step >= item ? "bg-blue" : "bg-gray-light"
                        }`}
                    >
            Step {item}
          </span>
                ))}
            </div>
            <div
                className="flex flex-col justify-between w-1/2 bg-white p-8 rounded-lg shadow-md"
                style={{ minHeight: "500px" }}
            >
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(step === 4 ? handleSubmit : handleNext)}
                        className="flex flex-col gap-5"
                    >
                        {renderStepContent()}
                        <div className="flex gap-4 mt-10">
                            {step > 1 && (
                                <CustomButton
                                    type="button"
                                    title="Back"
                                    onClick={handleBack}
                                    color="gray"
                                    size="18"
                                />
                            )}
                            <CustomButton
                                type="submit"
                                title={step === 4 ? "Finish" : "Next"}
                                color={step === 4 ? "green" : "black"}
                                size="18"
                            />
                        </div>
                    </form>
                </FormProvider>
                <p className="mt-5 text-sm">
                    Already have an account?{" "}<Link to="/signin" className="text-blue hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
