import React from "react";
import { act, render, screen } from "@testing-library/react";
import Input, { InputType } from "@src/components/Input/Input";
import userEvent from "@testing-library/user-event";
import { Rule } from "@src/features/Input/Rule";

const customMessagesForTests = {
    required: "custom req msg",
    min: "custom min msg",
    max: "custom max msg",
    minLen: "custom minLen msg",
    maxLen: "custom maxLen msg",
    forbiddenValues: "custom forbidden values msg",
    noSpecialChars: "custom noSpecialChars msg",
    onlyLetters: "custom onlyLetters msg",
    noNchars: "custom noNChars msg",
    notANumber: "The value entered is not a number",
};

const rulesValuesForTests = {
    min: 5,
    max: 10,
    minLen: 5,
    maxLen: 10,
    forbiddenValues: "*&",
    noNchars: ["-", "'", " "],
};

describe("Input component", () => {
    it("should render input component", () => {
        render(<Input
            type={InputType.text}
            placeholder="test placeholder"
            label="Input text label"
            value="test value"
            id="test id"
            name="test name"
            rules={[Rule.required()]}
        />);

        const inputComponent = screen.getByPlaceholderText("test placeholder");

        expect(inputComponent).toBeInTheDocument();
    });

    //TODO: Fix bellow test for checkbox and radio
    it.each([
        [InputType.email, "email placeholder", InputType.email],
        [InputType.text, "text placeholder", InputType.text],
        [InputType.password, "password placeholder", InputType.password],
        /*[InputType.checkbox, "checkbox label", InputType.checkbox],
        [InputType.radio, "radio label", InputType.radio],*/
    ])("should render the correct type of input depending on the passed props (input type: %s) ", (inputType, placeholderText, expectedType) => {
        render(<Input
            type={inputType}
            label={`labeltext-${placeholderText}`}
            placeholder={placeholderText}
            id="test id"
            name="test name"
            value=""
            rules={[Rule.required()]}
        />);

        const inputComponent = screen.getByPlaceholderText(placeholderText);

        expect(inputComponent.getAttribute("type")).toEqual(expectedType);
    });

    //TODO: fix below test for checkbox and radio
    it.each([
        [InputType.email, "email placehodler", ""],
        [InputType.text, "text placehodler", ""],
        [InputType.password, "password placehodler", ""],
        /*[InputType.radio, "radio label", "checked value"],*/
    ])("should update input value AND/OR checked property correctly after user interaction", (inputType, placeholderText, value) => {
        render(<Input
            type={inputType}
            label={`labelText_${placeholderText}`}
            placeholder={placeholderText}
            id="test id"
            name="test name"
            value={value}
            rules={[Rule.required()]}
        />);

        const inputComponent: HTMLInputElement = screen.getByPlaceholderText(placeholderText);

        userEvent.type(inputComponent, "text");
        expect(inputComponent).toHaveValue("text");

        userEvent.clear(inputComponent);
        expect(inputComponent).toHaveValue("");
    });

    //TODO: refactor code below
    /*it("only one radio button from a group should be checked at a time", () => {
        render(
            <>
                <Input
                    type={InputType.radio}
                    label="radio1"
                    id="radio1id"
                    name="radioGroup"
                    value="radio1Value"
                    rules={[Rule.required()]}
                />
                <Input
                    type={InputType.radio}
                    label="radio2"
                    id="radio2id"
                    name="radioGroup"
                    value="radio2Value"
                    rules={[Rule.required()]}
                />
            </>,
        );

        const radioOneElement: HTMLInputElement = screen.getByLabelText("radio1");
        const radioTwoElement: HTMLInputElement = screen.getByLabelText("radio2");

        userEvent.click(radioOneElement);
        expect(radioOneElement).toBeChecked();
        expect(radioTwoElement).not.toBeChecked();

        userEvent.click(radioTwoElement);
        expect(radioOneElement).not.toBeChecked();
        expect(radioTwoElement).toBeChecked();
    });*/

    it("should show 'required' error under the input onFocusOut if the input is empty AND its touched", () => {
        render(<Input
            type={InputType.text}
            label="input label"
            placeholder="placeholder text"
            id="inputId"
            name="name"
            value=""
            rules={[Rule.required()]}
        />);

        const inputElement: HTMLInputElement = screen.getByPlaceholderText("placeholder text");
        userEvent.type(inputElement, "test");
        userEvent.clear(inputElement);

        const elementForFocusOut = screen.getByTestId("input-container");

        userEvent.click(elementForFocusOut);
        const errorSpan = screen.getByText("The field is required");

        expect(errorSpan).toBeInTheDocument();
    });

    it("should NOT show 'required' error under the input onFocusOut if the input is empty AND it HAS NOT BEEN touched", () => {
        render(<Input
            type={InputType.text}
            label="input label"
            placeholder="placeholder text"
            id="inputId"
            name="name"
            value=""
            rules={[Rule.required()]}
        />);

        const inputElement: HTMLInputElement = screen.getByPlaceholderText("placeholder text");
        act(() => inputElement.focus());
        const elementForFocusOut = screen.getByTestId("input-container");

        userEvent.click(elementForFocusOut);
        const errorSpan = screen.queryByText("The field is required");

        expect(errorSpan).not.toBeInTheDocument();
    });

    it.each([
        [
            [Rule.required(), Rule.min(5)],
            "",
            [Rule.required().defaultMessage, Rule.min(5).defaultMessage],
        ],
        [
            [Rule.required(customMessagesForTests.required), Rule.min(5, customMessagesForTests.min)],
            "",
            [customMessagesForTests.required, customMessagesForTests.min],
        ],
        [
            [Rule.required(), Rule.min(rulesValuesForTests.min), Rule.max(rulesValuesForTests.max)],
            4,
            [Rule.min(rulesValuesForTests.min).defaultMessage],
        ],
        [
            [Rule.required(customMessagesForTests.required), Rule.min(rulesValuesForTests.min, customMessagesForTests.min), Rule.max(rulesValuesForTests.max, customMessagesForTests.max)],
            4,
            [customMessagesForTests.min],
        ],
        [
            [Rule.required(), Rule.min(rulesValuesForTests.min), Rule.max(rulesValuesForTests.max)],
            200,
            [Rule.max(rulesValuesForTests.max).defaultMessage],
        ],
        [
            [Rule.required(), Rule.min(rulesValuesForTests.min, customMessagesForTests.min), Rule.max(rulesValuesForTests.max, customMessagesForTests.max)],
            200,
            [customMessagesForTests.max],
        ],
    ])("should show correct errors under the input depending on the passed rules and value of the input", (rules, inputValue, errorMessages) => {
        render(<Input
            type={InputType.text}
            label="TEST_LABEL"
            placeholder="TEST_PLACEHOLDER"
            id="TEST_ID"
            name="TEST_NAME"
            value=""
            rules={rules}
        />);

        const inputElement: HTMLInputElement = screen.getByPlaceholderText("TEST_PLACEHOLDER");

        act(() => inputElement.focus());
        userEvent.type(inputElement, "D");
        userEvent.clear(inputElement);

        /**
         * The below IF is because of the JEST error if we "type" in a input element with empty string
         */
        if (inputValue === "") {
            userEvent.click(inputElement);
        } else {
            userEvent.type(inputElement, inputValue.toString());
        }

        const elementForFocusOut = screen.getByTestId("input-container");

        userEvent.click(elementForFocusOut);

        errorMessages.forEach((errorMessage) => {
            const errorSpan = screen.queryByText(errorMessage);

            expect(errorSpan).toBeInTheDocument();
        });
    });
});
