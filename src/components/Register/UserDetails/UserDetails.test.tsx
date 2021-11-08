import React from "react";
import { render, screen } from "@testing-library/react";
import UserDetails from "@src/components/Register/UserDetails/UserDetails";

describe("User Details", () => {
    it("should render user details component", () => {
        render(<UserDetails />);

        const header = screen.getByText("User Details Form");
        expect(header).toBeInTheDocument();
    });
});
