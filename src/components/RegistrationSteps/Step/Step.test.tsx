import React from 'react';
import { render, screen, } from '@testing-library/react';
import Step from '@src/components/RegistrationSteps/Step/Step';

describe("Registration step component", () => {
    it("should render register step component successfully", () => {
        render(<Step />)
        const registerHeading = screen.getByText("Account Details");

        expect(registerHeading.innerHTML).toEqual("Account Details")
    });
});
