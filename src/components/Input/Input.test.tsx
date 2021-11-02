import React from "react";
import { render, screen } from "@testing-library/react";
import Input, { InputType } from "@src/components/Input/Input";

describe("Input component", () => {
    it("should render input component", () => {
        render(<Input type={InputType.text} label="Input text label" />);

        const inputComponent = screen.getByLabelText("Input text label");

        expect(inputComponent).toBeInTheDocument();
    });

    it.each([
        [InputType.email, "Input email label"],
        [InputType.text, "Input email label"],
        [InputType.checkbox, "Input email label"],
        [InputType.password, "Input email label"],
        [InputType.radio, "Input email label"],
    ])("should render the correct type of input depending on the passed props", (inputType, labelText) => {
        render(<Input type={inputType} label={labelText} />);

        const inputComponent = screen.getByLabelText(labelText);

        expect(inputComponent).toBeInTheDocument();
    });
});
