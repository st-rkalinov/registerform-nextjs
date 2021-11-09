import React from "react";
import { render, screen } from "@testing-library/react";
import InputCheckbox from "@src/components/Input/InputCheckbox/InputCheckbox";

describe("Input component", () => {
    it("should render inputCheckbox component", () => {
        render(<InputCheckbox name="TEST_NAME" id="TEST_ID" value="TEST_VALUE" rules={[]} label="TEST_LABEL" />);

        const checkbox = screen.getByLabelText("TEST_LABEL");

        expect(checkbox).toBeInTheDocument();
    });
});
