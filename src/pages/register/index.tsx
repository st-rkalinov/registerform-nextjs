import React from "react";
import Stepper from "@src/components/Stepper/Stepper";
import Step, { RegistrationStepStatus } from "@src/components/RegistrationStepsNavigation/Step/Step";
import { RegistrationStepText } from "@src/pages";

const Register = () => {
    const stepComponents = [
        <Step
            text={RegistrationStepText.AccountDetails}
            stepNumber={1}
            status={RegistrationStepStatus.inProgress}
        />,
        <Step
            text={RegistrationStepText.UserDetails}
            stepNumber={2}
            status={RegistrationStepStatus.invalid}
        />,
        <Step
            text={RegistrationStepText.ContactDetails}
            stepNumber={3}
            status={RegistrationStepStatus.valid}
        />,
    ];

    return (
        <div className="w-full lg:w-2/3 bg-white mx-auto rounded-2xl flex-col justify-center items-center h-full shadow-2xl">
            <div className="flex justify-around items-center p-9">
                <h1 className="font-extrabold text-3xl">Register</h1>
            </div>
            <Stepper components={stepComponents} />
        </div>
    );
};

export default Register;
