import { IInputRule, IInputRuleValidatable, InputRule } from "@src/interfaces/InputRuleInteface";

export const charactersAllowedRegex = "^[0-9a-zA-Z]*$";
export const onlyLettersRegex = "^[a-zA-Z]*$";

const basicProps = (
    name: InputRule,
    defaultMessage: string,
    message?: string,
): IInputRule => ({
    name,
    defaultMessage,
    message,
});

export const Rule = {
    required: (message?: string): IInputRuleValidatable => ({
        ...basicProps(InputRule.required, "The field is required", message),
        isValid: (inputValue) => inputValue !== "",
    }),
    min: (minValue: number, message?: string): IInputRuleValidatable & { min: number } => ({
        ...basicProps(InputRule.min, `The field min value is ${minValue}`, message),
        min: minValue,
        isValid: (inputValue) => {
            if (Number.isNaN(+inputValue)) {
                throw new Error("NaN input value");
            }

            return +inputValue >= minValue;
        },
    }),
    max: (maxValue: number, message?: string): IInputRuleValidatable & { max: number } => ({
        ...basicProps(InputRule.max, `The field max value is ${maxValue}`, message),
        max: maxValue,
        isValid: (inputValue) => {
            if (Number.isNaN(+inputValue)) {
                throw new Error("NaN input value");
            }

            return +inputValue <= maxValue;
        },
    }),
    minLen: (
        minLenValue: number,
        message?: string,
    ): IInputRuleValidatable & { minLen: number } => ({
        ...basicProps(InputRule.minLen, `The field min length is ${minLenValue}`, message),
        minLen: minLenValue,
        isValid: (inputValue) => inputValue.length >= minLenValue,
    }),
    maxLen: (
        maxLenValue: number,
        message?: string,
    ): IInputRuleValidatable & { maxLen: number } => ({
        ...basicProps(InputRule.maxLen, `The field max length is ${maxLenValue}`, message),
        maxLen: maxLenValue,
        isValid: (inputValue) => inputValue.length <= maxLenValue,
    }),
    forbiddenValues: (
        forbiddenValues: string[],
        message?: string,
    ): IInputRuleValidatable & { forbiddenValues: string[] } => ({
        ...basicProps(InputRule.forbiddenValues, `The field can not include ${forbiddenValues.join(" ")}`, message),
        forbiddenValues,
        isValid: (inputValue) => false,
    }),
    noSpecialChars: (message?: string): IInputRuleValidatable & { charactersAllowedRegex: string } => ({
        ...basicProps(InputRule.noSpecialChars, "The field cannot include special characters", message),
        charactersAllowedRegex,
        isValid: (inputValue) => false,
    }),
    onlyLetters: (message?: string): IInputRuleValidatable & { onlyLettersRegex: string } => ({
        ...basicProps(InputRule.onlyLetters, "The field can include only letters characters", message),
        onlyLettersRegex,
        isValid: (inputValue) => false,
    }),
    noNCharsNextToEachOther: (
        chars: string[],
        charsCount: number,
        message?: string,
    ): IInputRuleValidatable & { chars: string[], charsCount: number } => ({
        ...basicProps(InputRule.no_N_charactersNextToEachOther, `The field can not include more than ${chars.join(", ")} next to each other`, message),
        chars,
        charsCount,
        isValid: (inputValue) => false,
    }),
};
