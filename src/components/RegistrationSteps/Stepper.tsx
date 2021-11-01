import React from 'react';
import Step, { RegistrationStepStatus } from '@src/components/RegistrationSteps/Step/Step';

export enum RegistrationStepText {
    AccountDetails = "ACCOUNT DETAILS",
    UserDetails = "USER DETAILS",
    ContactDetails = "CONTACT DETAILS"
}
const Stepper = () => {
    return (
        <div className="flex justify-center items-center">
            <Step
                text={RegistrationStepText.AccountDetails}
                stepNumber={1}
                status={RegistrationStepStatus.inProgress}
            />
            <Step
                text={RegistrationStepText.UserDetails}
                stepNumber={2}
                status={RegistrationStepStatus.inProgress}
            />
            <Step
                text={RegistrationStepText.ContactDetails}
                stepNumber={3}
                status={RegistrationStepStatus.inProgress}
            />
        </div>
    );
};

export default Stepper;
