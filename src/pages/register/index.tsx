import React from "react";
import Stepper from "@src/components/Stepper/Stepper";
import Step, { RegistrationStepStatus } from "@src/components/RegistrationStepsNavigation/Step/Step";
import { RegistrationStepText } from "@src/pages";
import Input, { InputType } from "@src/components/Input/Input";
import { Rule } from "@src/utils/Input/Rule";

const Register = () => {
    const stepComponents = [
        <Step
            text={RegistrationStepText.AccountDetails}
            stepNumber={1}
            status={RegistrationStepStatus.inProgress}
        />,
        <Step
            text={RegistrationStepText.UserDetails}
            stepNumber={2}
            status={RegistrationStepStatus.invalid}
        />,
        <Step
            text={RegistrationStepText.ContactDetails}
            stepNumber={3}
            status={RegistrationStepStatus.valid}
        />,
    ];

    return (
        <div className="w-full lg:w-2/3 bg-white mx-auto rounded-2xl flex-col justify-center items-center h-full shadow-2xl">
            <div className="flex justify-around items-center p-9">
                <h1 className="font-extrabold text-3xl">Register</h1>
            </div>
            <Stepper steps={stepComponents} />
            <Input
                label="Username"
                type={InputType.text}
                name="username"
                id="email"
                value=""
                rules={[Rule.required(), Rule.minLen(5), Rule.maxLen(10)]}
            />
            {/*<Input label="Email" type={InputType.email} name="email" id="username" value="" />
            <Input label="Password" type={InputType.password} name="password" id="password" value="" />
            <Input label="Male" type={InputType.radio} name="gender" id="gender1" value="Male" />
            <Input label="Female" type={InputType.radio} name="gender" id="gender2" value="Female" />
            <Input label="Some long checkbox label" type={InputType.checkbox} name="gender" id="gender2" value="Female" />*/}
        </div>
    );
};

export default Register;
