export enum InputRule {
    required = "required",
    max = "max",
    min = "min",
    forbiddenValues = "forbiddenValues",
    custom = "custom",
}

export interface IBasicInputRule {
    name: InputRule;
    message: string;
    validator?: () => boolean;
}

export interface IMinRule extends IBasicInputRule {
    min?: number
}

export interface IMaxRule extends IBasicInputRule {
    max?: number;
}

export interface IForbiddenValues extends IBasicInputRule {
    forbiddenValues?: string | string[];
}

export interface IRequiredRule extends IBasicInputRule {
    required?: boolean;
}

export interface IInputRule extends IBasicInputRule, IMinRule, IMaxRule, IForbiddenValues, IRequiredRule {}
