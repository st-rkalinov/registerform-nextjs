import React from 'react';
import Stepper from '@src/components/RegistrationSteps/Stepper';

const Register = () => {
    return (
        <div className="w-full lg:w-1/2 bg-white mx-auto rounded-lg flex-col justify-center items-center">
            <div className="flex justify-around items-center p-6">
                <h1 className="font-bold text-2xl">Register</h1>
            </div>
            <Stepper />
        </div>
    );
};

export default Register;
