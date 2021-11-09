import React, { useState } from "react";
import useValidation from "@src/hooks/useValidation/useValidation";
import { IInputRule, IValidatable } from "@src/interfaces/InputRuleInteface";
import CheckBoxSvg from "@src/components/icons/checkboxSvg/CheckBoxSvg";

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
        <div data-testid="input-container" className="p-3 flex items-start relative">
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
                className="opacity-0 absolute h-8 w-8 mdo-checkbox"
            />
            <div
                className="mdo-customCheckbox"
            >
                <CheckBoxSvg />
            </div>
            <label htmlFor={id}>{label}</label>
            { errors.map((err) => (<span key={err.toString()}>{ err }</span>)) }
        </div>
    );
};

export default InputCheckbox;
