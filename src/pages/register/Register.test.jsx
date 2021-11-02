import React from "react";
import {
    render,
    screen,
} from "@testing-library/react";
import Register from "@src/pages/register/index";
import { RegistrationStepText } from "@src/components/RegistrationStepsNavigation/Stepper";

describe("Register Page", () => {
    it("should render register component successfully", () => {
        const { getByRole } = render(<Register />);
        const registerHeading = getByRole("heading", { level: 1 });

        expect(registerHeading.innerHTML).toEqual("Register");
    });

    it("should render steps navigation", () => {
        render(<Register />);

        const accountDetailsNavigationComponent = screen
            .getByText(RegistrationStepText.AccountDetails);
        const userDetailsNavigationComponent = screen
            .getByText(RegistrationStepText.UserDetails);
        const contactDetailsNavigationComponent = screen
            .getByText(RegistrationStepText.ContactDetails);

        expect(accountDetailsNavigationComponent.innerHTML)
            .toEqual(RegistrationStepText.AccountDetails);
        expect(userDetailsNavigationComponent.innerHTML)
            .toEqual(RegistrationStepText.UserDetails);
        expect(contactDetailsNavigationComponent.innerHTML)
            .toEqual(RegistrationStepText.ContactDetails);
    });
});
