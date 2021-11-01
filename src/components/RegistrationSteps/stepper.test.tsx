import React from 'react';
import { render, screen } from '@testing-library/react';
import Stepper from '@src/components/RegistrationSteps/Stepper';

describe("Registration Stepper navigation", () => {
    it("should render all steps", () => {
        render(<Stepper />)

        const accountDetailsNavigationComponent = screen.getByText("Account Details");
        const userDetailsNavigationComponent = screen.getByText("User Details");
        const contactDetailsNavigationComponent = screen.getByText("Contact Details");

        expect(accountDetailsNavigationComponent.innerHTML).toEqual("Account Details");
        expect(userDetailsNavigationComponent.innerHTML).toEqual("User Details");
        expect(contactDetailsNavigationComponent.innerHTML).toEqual("Contact Details");
    })
});
