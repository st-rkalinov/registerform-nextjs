import React from "react";
import { render, screen } from "@testing-library/react";
import ContactDetails from "@src/components/Register/ContactDetails/ContactDetails";

describe("Contact Details", () => {
    it("should render contact details component", () => {
        render(<ContactDetails />);

        const header = screen.getByText("Contact Details Form");
        expect(header).toBeInTheDocument();
    });
});
