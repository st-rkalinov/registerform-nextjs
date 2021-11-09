import React, { useState } from "react";
import { IInputRule, IValidatable } from "@src/interfaces/InputRuleInteface";
import useValidation from "@src/hooks/useValidation/useValidation";

interface IProps {
    name: string,
    id: string,
    value: string,
    rules: (IInputRule & IValidatable)[],
    label: string,
}

const InputRadio: React.FC<IProps> = ({
    name,
    id,
    value,
    label,
    rules,
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { errors, checkForErrors } = useValidation(rules);

    return (
        <div data-testid="input-container" className="p-3">
            <input
                type="radio"
                name={name}
                id={id}
                value={value}
                checked={isChecked}
                onChange={() => {
                    setIsChecked(!isChecked);
                }}
                className="w-full rounded-md border-solid border-4 border-gray-300 focus:border-gray-500 hover:border-gray-400 outline-none p-3 placeholder-gray-500 font-bold"
            />
            <label htmlFor={id}>{label}</label>
            { errors.map((err) => (<span key={err.toString()}>{ err }</span>)) }
        </div>
    );
};

export default InputRadio;
