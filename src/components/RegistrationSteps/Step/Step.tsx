import React from "react";

interface IProps {
    text: string,
    stepNumber: number,
    inProgress: boolean,
    valid: boolean,
}

const Step: React.FC<IProps> = (props) => {
    return (
        <div>
            <p>{props.text}</p>
            <p>{props.stepNumber}</p>
        </div>
    );
};

export default Step;
