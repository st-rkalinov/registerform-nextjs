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
    type: InputType,
    placeholder: string,
    name: string,
    id: string,
    value: string,
    rules: (IInputRule & IValidatable)[],
    label?: string,
}

const Input: React.FC<IProps> = ({
    type,
    label,
    name,
    id,
    value,
    placeholder,
    rules,
}) => {
    const [inputValue, setInputValue] = useState<string>(value || "");
    const { isTouched, setIsTouched } = useIsTouched();
    const { errors, checkForErrors } = useValidation(rules);

    return (
        <div data-testid="input-container" className="p-3">
            { label ? <label htmlFor={id}>{label}</label> : null }
            <input
                type={type}
                name={name}
                id={id}
                value={inputValue}
                placeholder={placeholder}
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
                className="w-full rounded-md border-solid border-4 border-gray-300 focus:border-gray-500 hover:border-gray-400 outline-none p-3 placeholder-gray-500 font-bold"
            />
            { errors.map((err) => (<span key={err.toString()}>{ err }</span>)) }
        </div>
    );
};

Input.defaultProps = {
    label: undefined,
};

export default Input;
