import React from 'react';
import { render, screen } from '@testing-library/react';
import Stepper, { RegistrationStepText } from '@src/components/RegistrationStepsNavigation/Stepper';

describe("Registration Stepper navigation", () => {
    it("should render all steps", () => {
        render(<Stepper />)

        const accountDetailsNavigationComponent = screen.getByText(RegistrationStepText.AccountDetails);
        const userDetailsNavigationComponent = screen.getByText(RegistrationStepText.UserDetails);
        const contactDetailsNavigationComponent = screen.getByText(RegistrationStepText.ContactDetails);

        expect(accountDetailsNavigationComponent.innerHTML).toEqual(RegistrationStepText.AccountDetails);
        expect(userDetailsNavigationComponent.innerHTML).toEqual(RegistrationStepText.UserDetails);
        expect(contactDetailsNavigationComponent.innerHTML).toEqual(RegistrationStepText.ContactDetails);
    })
});
