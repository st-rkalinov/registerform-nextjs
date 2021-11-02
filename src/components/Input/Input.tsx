import React, { useState } from "react";

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
}

const Input: React.FC<IProps> = ({
    type,
    label,
    name,
    id,
    value,
}) => {
    const [inputValue, setInputValue] = useState(value || "");

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input type={type} name={name} id={id} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </div>
    );
};

export default Input;
