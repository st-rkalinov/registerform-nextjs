import { IInputRule, IInputRuleValidatable, InputRule } from "@src/interfaces/InputRuleInteface";

export const charactersAllowedRegex = "^[0-9a-zA-Z]*$";
export const onlyLettersRegex = "^[a-zA-Z]*$";

const inputRuleBasicProps = (
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
        ...inputRuleBasicProps(InputRule.required, "The field is required", message),
        isValid: (inputValue) => inputValue !== "",
    }),
    min: (minValue: number, message?: string): IInputRuleValidatable & { min: number } => ({
        ...inputRuleBasicProps(InputRule.min, `The field min value is ${minValue}`, message),
        min: minValue,
        isValid: (inputValue) => {
            if (Number.isNaN(+inputValue)) {
                throw new Error("NaN input value");
            }

            return +inputValue >= minValue;
        },
    }),
    max: (maxValue: number, message?: string): IInputRuleValidatable & { max: number } => ({
        ...inputRuleBasicProps(InputRule.max, `The field max value is ${maxValue}`, message),
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
        ...inputRuleBasicProps(InputRule.minLen, `The field min length is ${minLenValue}`, message),
        minLen: minLenValue,
        isValid: (inputValue) => inputValue.length >= minLenValue,
    }),
    maxLen: (
        maxLenValue: number,
        message?: string,
    ): IInputRuleValidatable & { maxLen: number } => ({
        ...inputRuleBasicProps(InputRule.maxLen, `The field max length is ${maxLenValue}`, message),
        maxLen: maxLenValue,
        isValid: (inputValue) => inputValue.length <= maxLenValue,
    }),
    forbiddenValues: (
        forbiddenValues: string[],
        message?: string,
    ): IInputRuleValidatable & { forbiddenValues: string[] } => ({
        ...inputRuleBasicProps(InputRule.forbiddenValues, `The field can not include ${forbiddenValues.join(" ")}`, message),
        forbiddenValues,
        isValid: (inputValue) => false,
    }),
    noSpecialChars: (message?: string): IInputRuleValidatable & { charactersAllowedRegex: string } => ({
        ...inputRuleBasicProps(InputRule.noSpecialChars, "The field cannot include special characters", message),
        charactersAllowedRegex,
        isValid: (inputValue) => false,
    }),
    onlyLetters: (message?: string): IInputRuleValidatable & { onlyLettersRegex: string } => ({
        ...inputRuleBasicProps(InputRule.onlyLetters, "The field can include only letters characters", message),
        onlyLettersRegex,
        isValid: (inputValue) => false,
    }),
    noNCharsNextToEachOther: (
        chars: string[],
        charsCount: number,
        message?: string,
    ): IInputRuleValidatable & { chars: string[], charsCount: number } => ({
        ...inputRuleBasicProps(InputRule.no_N_charactersNextToEachOther, `The field can not include more than ${chars.join(", ")} next to each other`, message),
        chars,
        charsCount,
        isValid: (inputValue) => false,
    }),
};
