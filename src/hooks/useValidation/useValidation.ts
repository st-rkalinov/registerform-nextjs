import { useState } from "react";
import { IInputRule, IValidatable } from "@src/interfaces/InputRuleInteface";

interface IUseValidation {
    errors: string[],
    checkForErrors: (inputValue: string) => void,
}

const useValidation = (rules: (IInputRule & IValidatable)[]): IUseValidation => {
    const [errors, setErrors] = useState<string[]>([]);

    const checkForErrors = (inputValue: string): void => {
        const inputErrors: string[] = [];

        if (rules.length === 0) {
            return;
        }

        rules.forEach((rule) => {
            if (!rule.isValid(inputValue)) {
                inputErrors.push(rule.message || rule.defaultMessage);
            }
        });

        setErrors(inputErrors);
    };

    return { errors, checkForErrors };
};

export default useValidation;
