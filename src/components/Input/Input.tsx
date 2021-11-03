import React, { useState } from "react";
import {
    IForbiddenValues,
    IInputRule,
    IMaxRule,
    IMinRule,
    IRequiredRule,
} from "@src/interfaces/InputRuleInteface";
import { InputValidator } from "@src/classes/InputValidator";

export enum InputType {
    text = "text",
    email = "email",
    password = "password",
    checkbox = "checkbox",
    radio = "radio",
}

interface IProps {
    label: string,
    type: InputType,
    name: string,
    id: string,
    value: string,
    rules: (IInputRule | IMinRule | IMaxRule | IForbiddenValues | IRequiredRule)[],
}

const Input: React.FC<IProps> = ({
    type,
    label,
    name,
    id,
    value,
    rules,
}) => {
    const [inputValue, setInputValue] = useState<string>(value || "");
    const [errors, setErrors] = useState<string[]>([]);

    const validateInputRules = (e: { target: HTMLInputElement }) => {
        const inputErrors: string[] = [];

        if (rules.length === 0) {
            return;
        }

        rules.forEach((rule) => {
            if (!InputValidator.validate(rule, e.target.value)) {
                inputErrors.push(InputValidator.getValidationErrorMessage(rule));
            }
        });

        setErrors(inputErrors);
    };

    return (
        <div data-testid="input-container">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                name={name}
                id={id}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={validateInputRules}
            />
            { errors.map((err) => (<span key={err.toString()}>{ err }</span>)) }
        </div>
    );
};

export default Input;
