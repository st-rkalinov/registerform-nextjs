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
});
