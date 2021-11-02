import React from "react";
import { render, screen } from "@testing-library/react";
import Step, { RegistrationStepStatus } from "@src/components/RegistrationStepsNavigation/Step/Step";
import { RegistrationStepText } from "@src/components/RegistrationStepsNavigation/Stepper";

describe("Registration step component", () => {
    it("should render register step component successfully", () => {
        const text = RegistrationStepText.AccountDetails;

        render(
            <Step
                text={text}
                stepNumber={1}
                status={RegistrationStepStatus.inProgress}
            />,
        );
        const registerHeading = screen.getByText(text);

        expect(registerHeading.innerHTML).toEqual(text);
    });

    it.each([
        [RegistrationStepText.AccountDetails, 1],
        [RegistrationStepText.UserDetails, 2],
        [RegistrationStepText.ContactDetails, 3],
    ])("should render the step component with correct text and number - (text: %s -> number: %s)", (text, number) => {
        render(
            <Step
                text={text}
                status={RegistrationStepStatus.inProgress}
                stepNumber={number}
            />,
        );

        const stepText = screen.getByText(text);
        const stepNumber = screen.getByText(number);

        expect(stepText.innerHTML).toEqual(text);
        expect(stepNumber.innerHTML).toEqual(number.toString());
    });

    it.each([
        [RegistrationStepStatus.inProgress, "bg-gray-900"],
        [RegistrationStepStatus.disabled, "bg-gray-300"],
        [RegistrationStepStatus.valid, "bg-gray-200"],
        [RegistrationStepStatus.invalid, "bg-red-200"],
    ])("should render the step component with correct status background class - (status: %s -> cssClass: %s)", (status, backgroundColorClass) => {
        render(
            <Step
                text={RegistrationStepText.AccountDetails}
                status={status}
                stepNumber={1}
            />,
        );

        const stepNumberContainer = screen.getByText(1);

        expect(stepNumberContainer).toHaveClass(backgroundColorClass);
    });

    it.each([
        [RegistrationStepStatus.inProgress, "text-gray-900"],
        [RegistrationStepStatus.disabled, "text-gray-300"],
        [RegistrationStepStatus.valid, "text-gray-900"],
        [RegistrationStepStatus.invalid, "text-gray-900"],
    ])("should render the step component with correct css for the text color- (status: %s -> cssClass: %s)", (status, textColorClass) => {
        render(
            <Step
                text={RegistrationStepText.AccountDetails}
                status={status}
                stepNumber={1}
            />,
        );

        const stepTextContainer = screen.getByText(RegistrationStepText.AccountDetails);

        expect(stepTextContainer).toHaveClass(textColorClass);
    });

    it.each([
        [RegistrationStepStatus.inProgress, "text-white"],
        [RegistrationStepStatus.disabled, "text-gray-400"],
        [RegistrationStepStatus.valid, "text-gray-900"],
        [RegistrationStepStatus.invalid, "text-gray-900"],
    ])("should render the step component with correct css class for the color of the number step - (status: %s -> cssClass: %s)", (status, textColorClass) => {
        render(
            <Step
                text={RegistrationStepText.AccountDetails}
                status={status}
                stepNumber={1}
            />,
        );

        const stepTextContainer = screen.getByText(1);

        expect(stepTextContainer).toHaveClass(textColorClass);
    });
});
