import { IInputRule, InputRule, } from "@src/interfaces/InputRuleInteface";

export const charactersAllowedRegex = "^[0-9a-zA-Z]*$";
export const onlyLettersRegex = "^[a-zA-Z]*$";

export const Rule = {
    required: (message?: string): IInputRule => ({
        name: InputRule.required,
        message,
        defaultMessage: "The field is required",
        isValid: (inputValue: string) => inputValue !== "",
    }),
    min: (minValue: number, message?: string): IInputRule & { min: number } => ({
        name: InputRule.min,
        message,
        min: minValue,
        defaultMessage: `The field min value is ${minValue}`,
        isValid: (inputValue: string) => {
            if (Number.isNaN(+inputValue)) {
                throw new Error("NaN input value");
            }

            return +inputValue >= minValue;
        },
    }),
    max: (maxValue: number, message?: string): IInputRule & { max: number } => ({
        name: InputRule.max,
        message,
        max: maxValue,
        defaultMessage: `The field max value is ${maxValue}`,
        isValid: (inputValue: string) => {
            if (Number.isNaN(+inputValue)) {
                throw new Error("NaN input value");
            }

            return +inputValue <= maxValue;
        },
    }),
    minLen: (minLenValue: number, message?: string): IInputRule & { minLen: number } => ({
        name: InputRule.minLen,
        message,
        minLen: minLenValue,
        defaultMessage: `The field min length is ${minLenValue}`,
        isValid: (inputValue: string) => inputValue.length >= minLenValue,
    }),
    maxLen: (maxLenValue: number, message?: string): IInputRule & { maxLen: number } => ({
        name: InputRule.maxLen,
        message,
        maxLen: maxLenValue,
        defaultMessage: `The field max length is ${maxLenValue}`,
        isValid: (inputValue: string) => inputValue.length <= maxLenValue,
    }),
    forbiddenValues: (forbiddenValues: string[], message?: string): IInputRule & { forbiddenValues: string[] } => ({
        name: InputRule.forbiddenValues,
        message,
        forbiddenValues,
        defaultMessage: `The field can not include ${forbiddenValues.join(" ")}`,
        isValid: (inputValue: string) => false,
    }),
    noSpecialChars: (message?: string): IInputRule & { charactersAllowedRegex: string } => ({
        name: InputRule.noSpecialChars,
        message,
        charactersAllowedRegex,
        defaultMessage: "The field cannot include special characters",
        isValid: (inputValue: string) => false,
    }),
    onlyLetters: (message?: string): IInputRule & { onlyLettersRegex: string } => ({
        name: InputRule.onlyLetters,
        message,
        onlyLettersRegex,
        defaultMessage: "The field can include only letters characters",
        isValid: (inputValue: string) => false,
    }),
    noNCharsNextToEachOther: (chars: string[], charsCount: number, message?: string): IInputRule & { chars: string[], charsCount: number } => ({
        name: InputRule.no_N_charactersNextToEachOther,
        message,
        chars,
        charsCount,
        defaultMessage: `The field can not include more than ${chars.join(", ")} next to each other`,
        isValid: (inputValue: string) => false,
    }),
};
