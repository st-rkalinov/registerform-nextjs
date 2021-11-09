export enum InputRule {
    required = "required",
    max = "max",
    min = "min",
    minLen = "minLen",
    maxLen = "maxLen",
    forbiddenValues = "forbiddenValues",
    regexExp = "regexExp",
    date = "date",
}

export interface IInputRule {
    name: InputRule;
    defaultMessage: string,
    message?: string | undefined;
}

export interface IValidatable {
    isValid: (target: HTMLInputElement) => boolean,
}
