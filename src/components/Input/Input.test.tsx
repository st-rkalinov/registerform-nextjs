import React from "react";
import { act, render, screen } from "@testing-library/react";
import Input, { InputType } from "@src/components/Input/Input";
import userEvent from "@testing-library/user-event";
import { maxRule, minRule, requiredRule } from "@src/utils/InputRulesUtils";

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
            label="Input text label"
            value="test value"
            id="test id"
            name="test name"
            rules={[requiredRule()]}
        />);

        const inputComponent = screen.getByLabelText("Input text label");

        expect(inputComponent).toBeInTheDocument();
    });

    it.each([
        [InputType.email, "email label", InputType.email],
        [InputType.text, "text label", InputType.text],
        [InputType.checkbox, "checkbox label", InputType.checkbox],
        [InputType.password, "password label", InputType.password],
        [InputType.radio, "radio label", InputType.radio],
    ])("should render the correct type of input depending on the passed props (input type: %s) ", (inputType, labelText, expectedType) => {
        render(<Input
            type={inputType}
            label={labelText}
            id="test id"
            name="test name"
            value=""
            rules={[requiredRule()]}
        />);

        const inputComponent = screen.getByLabelText(labelText, { selector: "input" });

        expect(inputComponent.getAttribute("type")).toEqual(expectedType);
    });

    it.each([
        [InputType.email, "email label", ""],
        [InputType.text, "text label", ""],
        [InputType.password, "password label", ""],
        [InputType.radio, "radio label", "checked value"],
        [InputType.checkbox, "checkbox label", "checked value"],
    ])("should update input value AND/OR checked property correctly after user interaction", (inputType, labelText, value) => {
        render(<Input
            type={inputType}
            label={labelText}
            id="test id"
            name="test name"
            value={value}
            rules={[requiredRule()]}
        />);

        const inputComponent: HTMLInputElement = screen.getByLabelText(labelText);

        if (inputType === InputType.radio || inputType === InputType.checkbox) {
            userEvent.click(inputComponent);
            expect(inputComponent).toBeChecked();
            expect(inputComponent.value).toEqual(value);
        } else {
            userEvent.type(inputComponent, "text");
            expect(inputComponent).toHaveValue("text");

            userEvent.clear(inputComponent);
            expect(inputComponent).toHaveValue("");
        }
    });

    it("only one radio button from a group should be checked at a time", () => {
        render(
            <>
                <Input
                    type={InputType.radio}
                    label="radio1"
                    id="radio1id"
                    name="radioGroup"
                    value="radio1Value"
                    rules={[requiredRule()]}
                />
                <Input
                    type={InputType.radio}
                    label="radio2"
                    id="radio2id"
                    name="radioGroup"
                    value="radio2Value"
                    rules={[requiredRule()]}
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
    });

    it("should show 'required' error under the input onFocusOut if the input is empty AND its touched", () => {
        render(<Input
            type={InputType.text}
            label="input label"
            id="inputId"
            name="name"
            value=""
            rules={[requiredRule()]}
        />);

        const inputElement: HTMLInputElement = screen.getByLabelText("input label");
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
            id="inputId"
            name="name"
            value=""
            rules={[requiredRule()]}
        />);

        const inputElement: HTMLInputElement = screen.getByLabelText("input label");
        act(() => inputElement.focus());
        const elementForFocusOut = screen.getByTestId("input-container");

        userEvent.click(elementForFocusOut);
        const errorSpan = screen.queryByText("The field is required");

        expect(errorSpan).not.toBeInTheDocument();
    });

    it.each([
        [
            [requiredRule(), minRule(5)],
            "",
            [requiredRule().defaultMessage, minRule(5).defaultMessage],
        ],
        [
            [requiredRule(customMessagesForTests.required), minRule(5, customMessagesForTests.min)],
            "",
            [customMessagesForTests.required, customMessagesForTests.min],
        ],
        [
            [requiredRule(), minRule(rulesValuesForTests.min), maxRule(rulesValuesForTests.max)],
            4,
            [minRule(rulesValuesForTests.min).defaultMessage],
        ],
        [
            [requiredRule(customMessagesForTests.required), minRule(rulesValuesForTests.min, customMessagesForTests.min), maxRule(rulesValuesForTests.max, customMessagesForTests.max)],
            4,
            [customMessagesForTests.min],
        ],
        [
            [requiredRule(), minRule(rulesValuesForTests.min), maxRule(rulesValuesForTests.max)],
            200,
            [maxRule(rulesValuesForTests.max).defaultMessage],
        ],
        [
            [requiredRule(), minRule(rulesValuesForTests.min, customMessagesForTests.min), maxRule(rulesValuesForTests.max, customMessagesForTests.max)],
            200,
            [customMessagesForTests.max],
        ],
    ])("should show correct errors under the input depending on the passed rules and value of the input", (rules, inputValue, errorMessages) => {
        render(<Input
            type={InputType.text}
            label="TEST_LABEL"
            id="TEST_ID"
            name="TEST_NAME"
            value=""
            rules={rules}
        />);

        const inputElement: HTMLInputElement = screen.getByLabelText("TEST_LABEL");

        act(() => inputElement.focus());
        userEvent.type(inputElement, "D");
        userEvent.clear(inputElement);

        userEvent.type(inputElement, inputValue.toString());
        const elementForFocusOut = screen.getByTestId("input-container");

        userEvent.click(elementForFocusOut);

        errorMessages.forEach((errorMessage) => {
            const errorSpan = screen.queryByText(errorMessage);

            expect(errorSpan).toBeInTheDocument();
        });
    });
});
