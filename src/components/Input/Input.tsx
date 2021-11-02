import React from "react";

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
}

const Input: React.FC<IProps> = ({ type, label }) => (
    <div>
        <label htmlFor="input">{ label }</label>
        <input type={type} name="input" id="input" />
    </div>
);

export default Input;
