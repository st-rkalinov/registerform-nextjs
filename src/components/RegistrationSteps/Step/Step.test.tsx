import React from 'react';
import { render, screen, } from '@testing-library/react';
import Step, { RegistrationStepStatus } from '@src/components/RegistrationSteps/Step/Step';
import { RegistrationStepText } from '@src/components/RegistrationSteps/Stepper';

describe("Registration step component", () => {
    it("should render register step component successfully", () => {
        const text = RegistrationStepText.AccountDetails;

        render(
            <Step
                text={text}
                stepNumber={1}
                status={RegistrationStepStatus.inProgress}
            />
        )
        const registerHeading = screen.getByText(text);

        expect(registerHeading.innerHTML).toEqual(text)
    });

    it.each([
        [RegistrationStepText.AccountDetails, 1],
        [RegistrationStepText.UserDetails, 2],
        [RegistrationStepText.ContactDetails, 3]
    ])("should render the step component with correct text and number - (text: %s -> number: %s)", (text, number) => {
        render(
            <Step
                text={text}
                status={RegistrationStepStatus.inProgress}
                stepNumber={number}
            />
        )

        const stepText = screen.getByText(text);
        const stepNumber = screen.getByText(number);

        expect(stepText.innerHTML).toEqual(text);
        expect(stepNumber.innerHTML).toEqual(number.toString());
    })
});
