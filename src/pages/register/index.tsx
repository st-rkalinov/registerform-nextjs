import React, { useCallback, useState } from "react";
import Stepper from "@src/components/Stepper/Stepper";
import Step, { RegistrationStepStatus } from "@src/components/Register/RegistrationStepsNavigation/Step/Step";
import { RegistrationStepText } from "@src/pages";
import AccountDetails from "@src/components/Register/AccountDetails/AccountDetails";
import UserDetails from "@src/components/Register/UserDetails/UserDetails";
import ContactDetails from "@src/components/Register/ContactDetails/ContactDetails";

const Register = () => {
    const [registrationStep, setRegistrationStep] = useState(RegistrationStepText.AccountDetails);

    const stepComponents = [
        <Step
            text={RegistrationStepText.AccountDetails}
            stepNumber={1}
            status={RegistrationStepStatus.inProgress}
            onStepClick={() => setRegistrationStep(RegistrationStepText.AccountDetails)}
        />,
        <Step
            text={RegistrationStepText.UserDetails}
            stepNumber={2}
            status={RegistrationStepStatus.invalid}
            onStepClick={() => setRegistrationStep(RegistrationStepText.UserDetails)}
        />,
        <Step
            text={RegistrationStepText.ContactDetails}
            stepNumber={3}
            status={RegistrationStepStatus.valid}
            onStepClick={() => setRegistrationStep(RegistrationStepText.ContactDetails)}
        />,
    ];

    const registerContent = useCallback(() => {
        switch (registrationStep) {
            case RegistrationStepText.AccountDetails:
                return <AccountDetails />;
            case RegistrationStepText.UserDetails:
                return <UserDetails />;
            case RegistrationStepText.ContactDetails:
                return <ContactDetails />;
            default:
                return <AccountDetails />;
        }
    }, [registrationStep]);

    return (
        <div className="w-full lg:w-2/3 bg-white mx-auto rounded-2xl flex-col justify-center items-center h-full shadow-2xl">
            <div className="flex justify-around items-center p-9">
                <h1 className="font-extrabold text-3xl">Register</h1>
            </div>
            <div className="flex-col w-1/2 justify-center mx-auto">
                <Stepper steps={stepComponents} />
                {registerContent()}
            </div>
            {/* <Input
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
            <Input label="Some long checkbox label" type={InputType.checkbox} name="gender" id="gender2" value="Female" rules={[]} /> */}
        </div>
    );
};

export default Register;
