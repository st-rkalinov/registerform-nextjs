import React from "react";

interface IProps {
    text: string,
    stepNumber: number,
    inProgress: boolean,
    valid: boolean,
}

const Step: React.FC<IProps> = (props) => {
    return (
        <div className="flex-col justify-center items-center w-24">
            <div className="rounded-full flex items-center justify-center bg-gray-900 h-12 w-12 text-white font-bold text-xl mx-auto">
                <p>{props.stepNumber}</p>
            </div>
            <p className="text-center break-words font-bold text-sm p-2">{props.text}</p>
        </div>
    );
};

export default Step;
