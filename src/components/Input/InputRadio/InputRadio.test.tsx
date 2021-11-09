import React from "react";
import { render, screen } from "@testing-library/react";
import InputRadio from "@src/components/Input/InputRadio/InputRadio";
import userEvent from "@testing-library/user-event";

describe("InputRadio component", () => {
    it("should render InputRadio component", () => {
        render(<InputRadio name="TEST_NAME" id="TEST_ID" value="TEST_VALUE" rules={[]} label="TEST_LABEL" />);

        const radioElement = screen.getByLabelText("TEST_LABEL");

        expect(radioElement).toBeInTheDocument();
    });

    it("InputRadio should become checked on click", () => {
        render(<InputRadio name="TEST_NAME" id="TEST_ID" value="TEST_VALUE" rules={[]} label="TEST_LABEL" />);

        const radioElement = screen.getByLabelText("TEST_LABEL");

        userEvent.click(radioElement);
        expect(radioElement).toBeInTheDocument();
        expect(radioElement).toBeChecked();

        userEvent.click(radioElement);
        expect(radioElement).toBeChecked();
    });

    it("only one radio button from a group should be checked at a time", () => {
        render(
            <>
                <InputRadio name="TEST_NAME" id="TEST_ID" value="TEST_VALUE" rules={[]} label="TEST_LABEL" />
                <InputRadio name="TEST_NAME" id="TEST_ID2" value="TEST_VALUE2" rules={[]} label="TEST_LABEL2" />
            </>,
        );

        const radioElementOne = screen.getByLabelText("TEST_LABEL");
        const radioElementTwo = screen.getByLabelText("TEST_LABEL2");

        expect(radioElementOne).toBeInTheDocument();
        expect(radioElementTwo).toBeInTheDocument();

        userEvent.click(radioElementOne);
        expect(radioElementOne).toBeChecked();
        expect(radioElementTwo).not.toBeChecked();

        userEvent.click(radioElementTwo);
        expect(radioElementTwo).toBeChecked();
        expect(radioElementOne).not.toBeChecked();
    });
});
