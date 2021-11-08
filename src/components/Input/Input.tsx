import React, { useState } from "react";
import useValidation from "@src/hooks/useValidation/useValidation";
import useIsTouched from "@src/hooks/useIsTouched/useIsTouched";
import { IInputRule, IValidatable } from "@src/interfaces/InputRuleInteface";

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
    rules: (IInputRule & IValidatable)[],
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
    const { isTouched, setIsTouched } = useIsTouched();
    const { errors, checkForErrors } = useValidation(rules);

    return (
        <div data-testid="input-container">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                name={name}
                id={id}
                value={inputValue}
                onChange={(e) => {
                    if (!isTouched) {
                        setIsTouched(true);
                    }
                    setInputValue(e.target.value);
                }}
                onBlur={(e) => {
                    if (isTouched) {
                        checkForErrors(e.target.value);
                    }
                }}
            />
            { errors.map((err) => (<span key={err.toString()}>{ err }</span>)) }
        </div>
    );
};

export default Input;
