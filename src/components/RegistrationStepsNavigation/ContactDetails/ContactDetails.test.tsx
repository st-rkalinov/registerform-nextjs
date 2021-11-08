import React from "react";
import { render, screen } from "@testing-library/react";
import ContactDetails
    from "@src/components/RegistrationStepsNavigation/ContactDetails/ContactDetails";

describe("Contact Details", () => {
    it("should render contact details component", () => {
        render(<ContactDetails />);

        const header = screen.getByText("Contact Details");
        expect(header).toBeInTheDocument();
    });
});
