import React, { ReactComponentElement } from "react";

interface IProps {
    steps: ReactComponentElement<any>[],
}

const Stepper: React.FC<IProps> = ({ steps }) => (

    <div className="flex justify-between items-center">
        {steps.map((component, index) => (
            <React.Fragment key={index}>
                {component}
                {index !== steps.length - 1 ? <div className="w-20 border-t-2 border-gray-300 self-baseline mt-6" /> : null}
            </React.Fragment>
        ))}
    </div>
);

export default Stepper;
