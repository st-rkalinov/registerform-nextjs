import { useState } from "react";
import { IInputRule, IValidatable } from "@src/interfaces/InputRuleInteface";

interface IUseValidation {
    errors: string[],
    checkForErrors: (target: HTMLInputElement) => void,
}

const useValidation = (rules: (IInputRule & IValidatable)[]): IUseValidation => {
    const [errors, setErrors] = useState<string[]>([]);

    const checkForErrors = (target: HTMLInputElement): void => {
        const inputErrors: string[] = [];

        if (rules.length === 0) {
            return;
        }

        rules.forEach((rule) => {
            if (!rule.isValid(target)) {
                inputErrors.push(rule.message || rule.defaultMessage);
            }
        });

        setErrors(inputErrors);
    };

    return { errors, checkForErrors };
};

export default useValidation;
