import { useState } from "react";
import {
    maxRuleValidator,
    minRuleValidator,
    requiredRuleValidator
} from "@src/utils/InputRulesUtils";
import { IInputRule, InputRule } from "@src/interfaces/InputRuleInteface";

interface IUseValidation {
    errors: string[],
    checkForErrors: (inputValue: string) => void,
}

const useValidation = (rules: IInputRule[]): IUseValidation => {
    const [errors, setErrors] = useState<string[]>([]);

    const getValidationErrorMessage = (rule: IInputRule) => rule?.message || rule.defaultMessage;

    const isValid = (rule: IInputRule, value: string) => {
        switch (rule.name) {
            case InputRule.required: {
                return requiredRuleValidator(value);
            }
            case InputRule.min: {
                return minRuleValidator(rule?.min, value);
            }
            case InputRule.max: {
                return maxRuleValidator(rule?.max, value);
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
