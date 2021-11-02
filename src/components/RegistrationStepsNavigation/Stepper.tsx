import React from "react";
import Step, { RegistrationStepStatus } from "@src/components/RegistrationStepsNavigation/Step/Step";

export enum RegistrationStepText {
    AccountDetails = "ACCOUNT DETAILS",
    UserDetails = "USER DETAILS",
    ContactDetails = "CONTACT DETAILS",
}

const Stepper = () => (
    <div className="flex justify-center items-center">
        <Step
            text={RegistrationStepText.AccountDetails}
            stepNumber={1}
            status={RegistrationStepStatus.inProgress}
        />
        <div className="w-20 border-t-2 border-gray-300 self-baseline mt-6" />
        <Step
            text={RegistrationStepText.UserDetails}
            stepNumber={2}
            status={RegistrationStepStatus.invalid}
        />
        <div className="w-20 border-t-2 border-gray-300 self-baseline mt-6" />
        <Step
            text={RegistrationStepText.ContactDetails}
            stepNumber={3}
            status={RegistrationStepStatus.valid}
        />
    </div>
);

export default Stepper;
