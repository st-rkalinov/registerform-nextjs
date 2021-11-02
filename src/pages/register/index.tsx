import React from "react";
import Stepper from "@src/components/RegistrationStepsNavigation/Stepper";

const Register = () => (
    <div className="w-full lg:w-2/3 bg-white mx-auto rounded-2xl flex-col justify-center items-center h-full shadow-2xl">
        <div className="flex justify-around items-center p-9">
            <h1 className="font-extrabold text-3xl">Register</h1>
        </div>
        <Stepper />
    </div>
);

export default Register;
