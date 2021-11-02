import React from "react";

export enum RegistrationStepStatus {
    valid = 'valid',
    invalid = 'invalid',
    inProgress = 'inProgress',
    disabled = 'disabled',
}

interface IProps {
    text: string,
    stepNumber: number,
    status: RegistrationStepStatus
}

/**
 * Method to get the correct background class depending on the status of the registration step
 * @param {RegistrationStepStatus} status
 */
const getBackgroundCssColor = (status: RegistrationStepStatus) => {
    switch (status) {
        case RegistrationStepStatus.inProgress:
            return "bg-gray-900";
        case RegistrationStepStatus.disabled:
            return "bg-gray-300";
        case RegistrationStepStatus.valid:
            return "bg-gray-200";
        case RegistrationStepStatus.invalid:
            return "bg-red-200";
        default:
            return "";
    }
};

const getStepNumberTextCssColorClass = (status: RegistrationStepStatus) => {
    switch (status) {
        case RegistrationStepStatus.inProgress:
            return "text-white";
        case RegistrationStepStatus.disabled:
            return "text-gray-400";
        case RegistrationStepStatus.valid:
        case RegistrationStepStatus.invalid:
            return "text-gray-900";
        default:
            return "";
    }
};

const Step: React.FC<IProps> = (props) => {
    const backgroundCssColor = getBackgroundCssColor(props.status);
    const textCssColor = props.status === RegistrationStepStatus.disabled ? "text-gray-300" : "text-gray-900";
    const stepNumberCssColor = getStepNumberTextCssColorClass(props.status);

    return (
        <div className="flex-col justify-center items-center w-24">
            <div className={`rounded-full flex items-center justify-center h-12 w-12 font-bold text-xl mx-auto ${backgroundCssColor} ${stepNumberCssColor}`}>
                {props.stepNumber}
            </div>
            <p className={`text-center break-words font-semibold text-sm p-2 ${textCssColor}`}>{props.text}</p>
        </div>
    );
};

export default Step;