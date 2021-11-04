import {
    IBasicInputRule,
    IForbiddenValues,
    IMaxLenRule,
    IMaxRule,
    IMinLenRule,
    IMinRule,
    INoNCharsNextToEachOther,
    INoSpecialCharsRule,
    InputRule,
} from "@src/interfaces/InputRuleInteface";

export const specialCharactersList = "!”#$%&’()*+,-./:;<=>?@[\\]^_`{|}~";

export const requiredRule = (message?: string, customValidator?: () => boolean): IBasicInputRule => ({
    name: InputRule.required,
    message,
    defaultMessage: "The field is required",
});

export const minRule = (minValue: number, message?: string, customValidator?: () => boolean): IMinRule => ({
    name: InputRule.min,
    message,
    min: minValue,
    defaultMessage: `The field min value is ${minValue}`,
});

export const maxRule = (maxValue: number, message?: string, customValidator?: () => boolean): IMaxRule => ({
    name: InputRule.max,
    message,
    max: maxValue,
    defaultMessage: `The field max value is ${maxValue}`
});

export const minLenRule = (minLenValue: number, message?: string, customValidator?: () => boolean): IMinLenRule => ({
    name: InputRule.minLen,
    message,
    minLen: minLenValue,
    defaultMessage: `The field min length is ${minLenValue}`,
});

export const maxLenRule = (maxLenValue: number, message?: string, customValidator?: () => boolean): IMaxLenRule => ({
    name: InputRule.maxLen,
    message,
    maxLen: maxLenValue,
    defaultMessage: `The field max length is ${maxLenValue}`,
});

export const forbiddenValuesRule = (forbiddenValues: string[], message?: string, customValidator?: () => boolean): IForbiddenValues => ({
    name: InputRule.forbiddenValues,
    message,
    forbiddenValues,
    defaultMessage: `The field can not include ${forbiddenValues.join(" ")}`,
});

export const noSpecialCharsRule = (specialCharacters = specialCharactersList, message?: string, customValidator?: () => boolean): INoSpecialCharsRule => ({
    name: InputRule.noSpecialChars,
    message,
    noSpecialChars: specialCharacters,
    defaultMessage: "The field cannot include special characters",
});

export const onlyLettersRule = (message?: string, customValidator?: () => boolean): IBasicInputRule => ({
    name: InputRule.onlyLetters,
    message,
    defaultMessage: "The field can include only letters characters",
});

export const noNCharsNextToEachOtherRule = (chars: string[], charsCount: number, message?: string, customValidator?: () => boolean): INoNCharsNextToEachOther => ({
    name: InputRule.no_N_charactersNextToEachOther,
    message,
    chars,
    charsCount,
    defaultMessage: `The field can not include more than ${chars.join(", ")} next to each other`,
});

export const requiredRuleValidator = (inputValue: string) => {
    return inputValue !== "";
};

export const minRuleValidator = (minValue: number, inputValue: string) => {
    if (Number.isNaN(+inputValue)) {
        throw new Error("NaN input value");
    }

    return +inputValue >= minValue;
};

export const maxRuleValidator = (maxValue: number, inputValue: string) => {
    if (Number.isNaN(+inputValue)) {
        throw new Error("NaN input value");
    }

    return +inputValue <= maxValue;
};
