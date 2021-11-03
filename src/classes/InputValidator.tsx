import {
    IBasicInputRule,
    IForbiddenValues,
    IInputRule,
    IMaxRule,
    IMinRule,
    InputRule,
    IRequiredRule,
} from "@src/interfaces/InputRuleInteface";

export class InputValidator {
    static validate(rule: IInputRule, value: string, customValidateHandler?: Function) {
        switch (rule.name) {
            case InputRule.required:
                return this.requiredValidationRule(value);
            case InputRule.min: {
                if ("min" in rule) {
                    return this.minValidationRule(rule.min, value);
                }

                return false;
            }
            case InputRule.max: {
                if ("max" in rule) {
                    return this.maxValidationRule(rule.max, value);
                }

                return false;
            }
            default:
                return false;
        }
    }

    static getValidationErrorMessage(rule: (IMaxRule | IMinRule | IRequiredRule | IForbiddenValues | IBasicInputRule)) {
        return rule.message;
    }

    static requiredValidationRule(value: string) {
        return value !== "";
    }

    static minValidationRule(minValue: number | undefined, inputValue: string | number) {
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
    }

    static maxValidationRule(maxValue: number | undefined, inputValue: string | number) {
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
    }
}
