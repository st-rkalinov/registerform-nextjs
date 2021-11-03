import {
    IForbiddenValues,
    IInputRule,
    IMaxRule,
    IMinRule,
    InputRule,
    IRequiredRule,
} from "@src/interfaces/InputRuleInteface";

export class InputValidator {
    static validate(rule: (IMaxRule | IMinRule | IRequiredRule | IForbiddenValues | IInputRule), value: string, customValidateHandler?: Function) {
        switch (rule.name) {
            case InputRule.required:
                return this.requiredValidationRule(value);
            case InputRule.min: {
                if ("min" in rule) {
                    return this.minValidationRule(rule.min, value);
                }

                return false;
            }
            default:
                return false;
        }
    }

    static getValidationErrorMessage(rule: (IMaxRule | IMinRule | IRequiredRule | IForbiddenValues | IInputRule)) {
        return rule.message;
    }

    // eslint-disable-next-line class-methods-use-this
    static requiredValidationRule(value: string) {
        return value !== "";
    }

    // eslint-disable-next-line class-methods-use-this
    static minValidationRule(minValue: number, inputValue: string | number) {
        if (!Number.isNaN(+inputValue)) {
            return inputValue >= minValue;
        }

        if (typeof inputValue === "string") {
            return inputValue.length >= minValue;
        }

        return false;
    }
}
