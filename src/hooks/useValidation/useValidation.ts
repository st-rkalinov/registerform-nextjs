import { useState } from "react";
import { IInputRule, InputRule } from "@src/interfaces/InputRuleInteface";

interface IUseValidation {
    errors: string[],
    checkForErrors: (inputValue: string) => void,
}

const useValidation = (rules: IInputRule[]): IUseValidation => {
    const [errors, setErrors] = useState<string[]>([]);

    const getValidationErrorMessage = (rule: IInputRule) => rule.message;

    const requiredValidationRule = (value: string) => value !== "";

    const minValidationRule = (minValue: number | undefined, inputValue: string | number) => {
        if (!minValue) {
            return false;
        }

        if (!Number.isNaN(+inputValue) && minValue) {
            return inputValue >= minValue;
        }

        if (typeof inputValue === "string") {
            return inputValue.length >= minValue;
        }

        return false;
    };

    const maxValidationRule = (maxValue: number | undefined, inputValue: string | number) => {
        if (!maxValue) {
            return false;
        }

        if (!Number.isNaN(+inputValue) && maxValue) {
            return inputValue <= maxValue;
        }

        if (typeof inputValue === "string") {
            return inputValue.length <= maxValue;
        }

        return false;
    };

    const isValid = (rule: IInputRule, value: string, customValidateHandler?: Function) => {
        switch (rule.name) {
            case InputRule.required: {
                return requiredValidationRule(value);
            }
            case InputRule.min: {
                if ("min" in rule) {
                    return minValidationRule(rule.min, value);
                }

                return false;
            }
            case InputRule.max: {
                if ("max" in rule) {
                    return maxValidationRule(rule.max, value);
                }

                return false;
            }
            default:
                return false;
        }
    };

    const checkForErrors = (inputValue: string): void => {
        const inputErrors: string[] = [];

        if (rules.length === 0) {
            return;
        }
        rules.forEach((rule) => {
            if (!isValid(rule, inputValue)) {
                inputErrors.push(getValidationErrorMessage(rule));
            }
        });

        setErrors(inputErrors);
    };

    return { errors, checkForErrors };
};

export default useValidation;
