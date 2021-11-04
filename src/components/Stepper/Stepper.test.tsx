import React from "react";
import { render, screen } from "@testing-library/react";
import Stepper from "@src/components/Stepper/Stepper";
import { RegistrationStepText } from "@src/pages";
import Step, { RegistrationStepStatus } from "@src/components/RegistrationStepsNavigation/Step/Step";

describe("Registration Stepper navigation", () => {
    it("should render all steps", () => {
        const stepComponents = [
            <Step
                text={RegistrationStepText.AccountDetails}
                stepNumber={1}
                status={RegistrationStepStatus.inProgress}
            />,
            <Step
                text={RegistrationStepText.UserDetails}
                stepNumber={2}
                status={RegistrationStepStatus.invalid}
            />,
            <Step
                text={RegistrationStepText.ContactDetails}
                stepNumber={3}
                status={RegistrationStepStatus.valid}
            />,
        ];
        render(<Stepper steps={stepComponents} />);

        const accountDetailsNavigationComponent = screen.getByText(RegistrationStepText.AccountDetails);
        const userDetailsNavigationComponent = screen.getByText(RegistrationStepText.UserDetails);
        const contactDetailsNavigationComponent = screen.getByText(RegistrationStepText.ContactDetails);

        expect(accountDetailsNavigationComponent.innerHTML).toEqual(RegistrationStepText.AccountDetails);
        expect(userDetailsNavigationComponent.innerHTML).toEqual(RegistrationStepText.UserDetails);
        expect(contactDetailsNavigationComponent.innerHTML).toEqual(RegistrationStepText.ContactDetails);
    });
});
