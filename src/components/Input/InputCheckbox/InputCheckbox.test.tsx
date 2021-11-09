import React from "react";
import { render, screen } from "@testing-library/react";
import InputCheckbox from "@src/components/Input/InputCheckbox/InputCheckbox";
import userEvent from "@testing-library/user-event";
import { Rule } from "@src/features/Input/Rule";

describe("Input component", () => {
    it("should render inputCheckbox component", () => {
        render(<InputCheckbox name="TEST_NAME" id="TEST_ID" value="TEST_VALUE" rules={[]} label="TEST_LABEL" />);

        const checkbox = screen.getByLabelText("TEST_LABEL");

        expect(checkbox).toBeInTheDocument();
    });

     it("should update checked value on click event", () => {
        render(<InputCheckbox
            label="TEST_LABEL"
            id="TEST_ID"
            name="TEST_NAME"
            value="TEST_VALUE"
            rules={[]}
        />);

        const inputComponent: HTMLInputElement = screen.getByLabelText("TEST_LABEL");

        userEvent.click(inputComponent);
        expect(inputComponent).toBeChecked();

        userEvent.click(inputComponent);
        expect(inputComponent).not.toBeChecked();
    });

     it("should show error under the checkbox if it is required", () => {
        render(<InputCheckbox
            label="TEST_LABEL"
            id="TEST_ID"
            name="TEST_NAME"
            value="TEST_VALUE"
            rules={[Rule.required()]}
        />);

        const inputComponent: HTMLInputElement = screen.getByLabelText("TEST_LABEL");

        userEvent.click(inputComponent);
        expect(inputComponent).toBeChecked();

        userEvent.click(inputComponent);
        expect(inputComponent).not.toBeChecked();

        const error = screen.getByText(Rule.required().defaultMessage);
        expect(error).toBeInTheDocument();

        userEvent.click(inputComponent);
        expect(inputComponent).toBeChecked();

        expect(screen.queryByText(Rule.required().defaultMessage)).not.toBeInTheDocument();
    });
});
