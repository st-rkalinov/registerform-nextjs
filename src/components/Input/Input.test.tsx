import React from "react";
import { render, screen } from "@testing-library/react";
import Input, { InputType } from "@src/components/Input/Input";
import userEvent from "@testing-library/user-event";

describe("Input component", () => {
    it("should render input component", () => {
        render(<Input type={InputType.text} label="Input text label" value="test value" id="test id" name="test name" />);

        const inputComponent = screen.getByLabelText("Input text label");

        expect(inputComponent).toBeInTheDocument();
    });

    it.each([
        [InputType.email, "email label"],
        [InputType.text, "text label"],
        [InputType.checkbox, "checkbox label"],
        [InputType.password, "password label"],
        [InputType.radio, "radio label"],
    ])("should render the correct type of input depending on the passed props (input type: %s) ", (inputType, labelText) => {
        render(<Input type={inputType} label={labelText} id="test id" name="test name" value="" />);

        const inputComponent = screen.getByLabelText(labelText);

        expect(inputComponent).toBeInTheDocument();
    });

    it.each([
        [InputType.email, "email label", ""],
        [InputType.text, "text label", ""],
        [InputType.password, "password label", ""],
        [InputType.radio, "radio label", "checked value"],
        [InputType.checkbox, "checkbox label", "checked value"],
    ])("should update input value OR checked property correctly after user interaction", (inputType, labelText, value) => {
        render(<Input type={inputType} label={labelText} id="test id" name="test name" value={value} />);

        const inputComponent: HTMLInputElement = screen.getByLabelText(labelText);

        if (inputType === InputType.radio || inputType === InputType.checkbox) {
            userEvent.click(inputComponent);
            expect(inputComponent.checked).toBe(true);
            expect(inputComponent.value).toEqual(value);
        } else {
            userEvent.type(inputComponent, "text");
            expect(inputComponent.value).toEqual("text");
        }
    });
});
