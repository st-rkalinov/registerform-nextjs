import React from "react";
import Stepper from "@src/components/Stepper/Stepper";
import Step, { RegistrationStepStatus } from "@src/components/RegistrationStepsNavigation/Step/Step";
import { RegistrationStepText } from "@src/pages";
import Input, { InputType } from "@src/components/Input/Input";
import { emailRegex, noSpecialCharacterRegex, Rule } from "@src/features/Input/Rule";

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
                id="username"
                value=""
                rules={[Rule.required(), Rule.minLen(5), Rule.maxLen(10)]}
            />
            <Input
                label="Email"
                type={InputType.email}
                name="email"
                id="email"
                value=""
                rules={[Rule.required(), Rule.maxLen(50), Rule.regexExp(emailRegex, "Invalid email address")]}
            />
            <Input
                label="Password"
                type={InputType.password}
                name="password"
                id="password"
                value=""
                rules={[Rule.required(), Rule.maxLen(12), Rule.minLen(8), Rule.regexExp(noSpecialCharacterRegex, "The field cannot include special characters")]}
            />
            <Input
                label="Male"
                type={InputType.radio}
                name="gender"
                id="gender1"
                value="Male"
                rules={[Rule.required()]}
            />
            <Input
                label="Female"
                type={InputType.radio}
                name="gender"
                id="gender2"
                value="Female"
                rules={[Rule.required()]}
            />
            <Input label="Some long checkbox label" type={InputType.checkbox} name="gender" id="gender2" value="Female" rules={[]} />
        </div>
    );
};

export default Register;
