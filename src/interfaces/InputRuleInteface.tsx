export enum InputRule {
    required = "required",
    max = "max",
    min = "min",
    minLen = "minLen",
    maxLen = "maxLen",
    forbiddenValues = "forbiddenValues",
    noSpecialChars = "noSpecialChars",
    onlyLetters = "onlyLetters",
    no_N_charactersNextToEachOther = "no_N_charactersNextToEachOther",
    date = "date",
}

export interface IInputRule {
    name: InputRule;
    defaultMessage: string,
    message?: string | undefined;
}

export interface IIsValid {
    isValid: (value: string) => boolean,
}

export interface IInputRuleValidatable extends IInputRule, IIsValid {}
