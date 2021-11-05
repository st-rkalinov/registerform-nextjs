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

export interface IBasicInputRule {
    name: InputRule;
    defaultMessage: string,
    message?: string | undefined;
}

export interface IMinRule extends IBasicInputRule {
    min: number
}

export interface IMaxRule extends IBasicInputRule {
    max: number;
}

export interface IMinLenRule extends IBasicInputRule {
    minLen: number
}

export interface IMaxLenRule extends IBasicInputRule {
    maxLen: number;
}

export interface IForbiddenValues extends IBasicInputRule {
    forbiddenValues: string[];
}

export interface IRequiredRule extends IBasicInputRule {
    required: boolean;
}

export interface INoSpecialCharsRule extends IBasicInputRule {
    charactersAllowedRegex: string;
}

export interface IOnlyLetters extends IBasicInputRule {
    onlyLettersRegex: string,
}

export interface INoNCharsNextToEachOther extends IBasicInputRule {
    charsCount: number
    chars: string[];
}

export type IInputRule = IMinRule | IBasicInputRule | IMaxRule | IForbiddenValues | IRequiredRule
| IMaxLenRule
| IMinLenRule
| INoNCharsNextToEachOther
| INoSpecialCharsRule
| IOnlyLetters;
