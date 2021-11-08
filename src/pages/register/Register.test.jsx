import React from "react";
import {
    render,
    screen,
} from "@testing-library/react";
import Register from "@src/pages/register/index";
import { RegistrationStepText } from "@src/pages";
import userEvent from "@testing-library/user-event";

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

    it("should render correct step component when clicking on the steps navigation", () => {
        render(<Register />);

        const accountDetailsNavigationComponent = screen
            .getByTestId(`step-${RegistrationStepText.AccountDetails}`);
        const userDetailsComponent = screen
            .getByTestId(`step-${RegistrationStepText.UserDetails}`);
        const contactDetaiilsComponent = screen
            .getByTestId(`step-${RegistrationStepText.ContactDetails}`);

        userEvent.click(accountDetailsNavigationComponent);

        const accountDetailsHeader = screen.getByText("Account Details Form");
        expect(accountDetailsHeader).toBeInTheDocument();

        userEvent.click(userDetailsComponent);

        const userDetailsHeader = screen.getByText("User Details Form");
        expect(userDetailsHeader).toBeInTheDocument();

        userEvent.click(contactDetaiilsComponent);

        const contactDetailsHeader = screen.getByText("Contact Details Form");
        expect(contactDetailsHeader).toBeInTheDocument();
    });
});
