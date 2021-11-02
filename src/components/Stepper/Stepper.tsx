import React, { ReactComponentElement } from "react";

interface IProps {
    components: ReactComponentElement<any>[],
}

const Stepper: React.FC<IProps> = ({ components }) => (

    <div className="flex justify-center items-center">
        {components.map((component, index) => (
            <React.Fragment key={index}>
                {component}
                {index !== components.length - 1 ? <div className="w-20 border-t-2 border-gray-300 self-baseline mt-6" /> : null}
            </React.Fragment>
        ))}
    </div>
);

export default Stepper;
