import React from 'react';
import { render, screen, } from '@testing-library/react';
import Step from '@src/components/RegistrationSteps/Step/Step';
import { RegistrationStepText } from '@src/components/RegistrationSteps/Stepper';

describe("Registration step component", () => {
    it("should render register step component successfully", () => {
        const text = RegistrationStepText.AccountDetails;

        render(
            <Step
                text={text}
                inProgress
                stepNumber={1}
                valid={false}
            />
        )
        const registerHeading = screen.getByText(text);

        expect(registerHeading.innerHTML).toEqual(text)
    });

    it.each([
        [RegistrationStepText.AccountDetails, 1, RegistrationStepText.AccountDetails],
        [RegistrationStepText.UserDetails, 2, RegistrationStepText.UserDetails],
        [RegistrationStepText.ContactDetails, 3, RegistrationStepText.ContactDetails]
    ])("should render the step component with correct text and number", (text, number, result) => {
        render(
            <Step
                text={text}
                inProgress
                stepNumber={number}
                valid={false}
            />
        )

        const stepText = screen.getByText(text);
        const stepNumber = screen.getByText(number);

        expect(stepText.innerHTML).toEqual(text);
        expect(stepNumber.innerHTML).toEqual(number.toString());
    })
});
