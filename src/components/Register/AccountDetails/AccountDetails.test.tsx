import React from "react";
import { render, screen } from "@testing-library/react";
import AccountDetails from "@src/components/Register/AccountDetails/AccountDetails";

describe("Account Details", () => {
    it("should render account details component", () => {
        render(<AccountDetails />);

        const header = screen.getByText("Account Details Form");
        expect(header).toBeInTheDocument();
    });
});
