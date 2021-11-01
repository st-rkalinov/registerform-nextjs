import React from 'react';
import Step from '@src/components/RegistrationSteps/Step/Step';

export enum RegistrationStepText {
    AccountDetails = "ACCOUNT DETAILS",
    UserDetails = "USER DETAILS",
    ContactDetails = "CONTACT DETAILS"
}
const Stepper = () => {
    return (
        <div className="flex justify-center items-center">
            <Step text={RegistrationStepText.AccountDetails} stepNumber={1} inProgress valid={true} />
            <Step text={RegistrationStepText.UserDetails} stepNumber={2} inProgress valid={true} />
            <Step text={RegistrationStepText.ContactDetails} stepNumber={3} inProgress valid={true} />
        </div>
    );
};

export default Stepper;
