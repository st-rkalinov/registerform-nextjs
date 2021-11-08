import { IInputRule, InputRule, IValidatable } from "@src/interfaces/InputRuleInteface";

export const noSpecialCharacterRegex = /^[0-9a-zA-Z]*$/;
export const noSpecialCharacterPlusSpaceRegex = /^[0-9a-zA-Z\s]*$/;
export const onlyLettersRegex = /^[a-zA-Z]*$/;
export const firstNameLastNameRegex = /^[a-zA-Z\s'-]*$/;
export const moreThanTwoSpacesDashesApostrophes = /([\s\-'])\1{2,}/;
export const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
    required: (message?: string): IInputRule & IValidatable => ({
        ...basicProps(InputRule.required, "The field is required", message),
        isValid: (inputValue) => inputValue !== "",
    }),
    min: (minValue: number, message?: string): IInputRule & IValidatable & { min: number } => ({
        ...basicProps(InputRule.min, `The field min value is ${minValue}`, message),
        min: minValue,
        isValid: (inputValue) => {
            if (Number.isNaN(+inputValue)) {
                throw new Error("The value entered is not a number");
            }

            return +inputValue >= minValue;
        },
    }),
    max: (maxValue: number, message?: string): IInputRule & IValidatable & { max: number } => ({
        ...basicProps(InputRule.max, `The field max value is ${maxValue}`, message),
        max: maxValue,
        isValid: (inputValue) => {
            if (Number.isNaN(+inputValue)) {
                throw new Error("The value entered is not a number");
            }

            return +inputValue <= maxValue;
        },
    }),
    minLen: (
        minLenValue: number,
        message?: string,
    ): IInputRule & IValidatable & { minLen: number } => ({
        ...basicProps(InputRule.minLen, `The field min length is ${minLenValue}`, message),
        minLen: minLenValue,
        isValid: (inputValue) => inputValue.length >= minLenValue,
    }),
    maxLen: (
        maxLenValue: number,
        message?: string,
    ): IInputRule & IValidatable & { maxLen: number } => ({
        ...basicProps(InputRule.maxLen, `The field max length is ${maxLenValue}`, message),
        maxLen: maxLenValue,
        isValid: (inputValue) => inputValue.length <= maxLenValue,
    }),
    forbiddenValues: (
        forbiddenValues: string[],
        message?: string,
    ): IInputRule & IValidatable & { forbiddenValues: string[] } => ({
        ...basicProps(InputRule.forbiddenValues, `The field can not include ${forbiddenValues.join(" ")}`, message),
        forbiddenValues,
        isValid: (inputValue) => {
            const inputValueValues = inputValue.split(" ").map((val) => val.toLowerCase());
            const lowerCaseForbiddenValues = forbiddenValues.map((val) => val.toLowerCase());

            return !lowerCaseForbiddenValues.some((forbiddenValue) => inputValueValues.includes(forbiddenValue));
        },
    }),
    regexExp: (regex: RegExp, message?: string): IInputRule & IValidatable & { regex: RegExp } => ({
        ...basicProps(InputRule.regexExp, `The field does not follow the pattern ${regex}`, message),
        regex,
        isValid: (inputValue) => regex.test(inputValue),
    }),
};
