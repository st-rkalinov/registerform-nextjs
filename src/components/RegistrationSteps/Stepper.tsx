import React from 'react';

export enum RegistrationStepText {
    AccountDetails = "ACCOUNT DETAILS",
    UserDetails = "USER DETAILS",
    ContactDetails = "CONTACT DETAILS"
}
const Stepper = () => {
    return (
        <div>
            <p>{ RegistrationStepText.AccountDetails }</p>
            <p>{ RegistrationStepText.UserDetails }</p>
            <p>{ RegistrationStepText.ContactDetails }</p>
        </div>
    );
};

export default Stepper;
