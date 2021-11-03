export enum InputRule {
    required = "required",
    max = "max",
    min = "min",
    forbiddenValues = "forbiddenValues",
    custom = "custom",
}

export interface IInputRule {
    name: InputRule;
    message: string;
    validator?: () => boolean;
}

export interface IMinRule extends IInputRule {
    min: number
}

export interface IMaxRule extends IInputRule {
    max: number;
}

export interface IForbiddenValues extends IInputRule {
    forbiddenValues: string | string[];
}

export interface IRequiredRule extends IInputRule {
    required: boolean;
}
