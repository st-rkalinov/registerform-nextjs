import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';
import Register from "@src/pages/register/index";

describe("Register Page", () => {
    it("should render register component successfully", () => {
        const { getByRole } = render(<Register />)
        const registerHeading = getByRole("heading", { level: 1});

        expect(registerHeading.innerHTML).toEqual("Register")
    });

    it("should render steps navigation", () => {
        render(<Register />)

        const accountDetailsNavigationComponent = screen.getByText("Account Details");
        const userDetailsNavigationComponent = screen.getByText("User Details");
        const contactDetailsNavigationComponent = screen.getByText("Contact Details");

        expect(accountDetailsNavigationComponent.innerHTML).toEqual("Account Details");
        expect(userDetailsNavigationComponent.innerHTML).toEqual("User Details");
        expect(contactDetailsNavigationComponent.innerHTML).toEqual("Contact Details");
    })
});
