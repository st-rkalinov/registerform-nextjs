import React, { useState } from "react";
import useValidation from "@src/hooks/useValidation/useValidation";
import { IInputRule, IValidatable } from "@src/interfaces/InputRuleInteface";

interface IProps {
    name: string,
    id: string,
    value: string,
    rules: (IInputRule & IValidatable)[],
    label: string,
}

const InputCheckbox: React.FC<IProps> = ({
    label,
    name,
    id,
    value,
    rules,
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { errors, checkForErrors } = useValidation(rules);

    return (
        <div data-testid="input-container" className="p-3">
            <input
                type="checkbox"
                name={name}
                id={id}
                value={value}
                checked={isChecked}
                onChange={(e) => {
                    setIsChecked(!isChecked);
                    checkForErrors(e.target);
                }}
                className="w-full rounded-md border-solid border-4 border-gray-300 focus:border-gray-500 hover:border-gray-400 outline-none p-3 placeholder-gray-500 font-bold"
            />
            <label htmlFor={id}>{label}</label>
            { errors.map((err) => (<span key={err.toString()}>{ err }</span>)) }
        </div>
    );
};

export default InputCheckbox;
