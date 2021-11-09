import React from "react";
import Input, { InputType } from "@src/components/Input/Input";
import {
    atLeastOneLetterRegex,
    atLeastOneNumberRegex,
    emailRegex,
    noSpecialCharacterRegex,
    onlyLettersRegex,
    Rule
} from "@src/features/Input/Rule";
import InputCheckbox from "@src/components/Input/InputCheckbox/InputCheckbox";

const AccountDetails = () => (
    <section className="p-3 flex-col justify-center">
        <Input
            type={InputType.email}
            id="email"
            placeholder="Email"
            value=""
            name="email"
            rules={[Rule.required(), Rule.regexExp(emailRegex, "Invalid Email address"), Rule.maxLen(50)]}
        />
        <Input
            type={InputType.password}
            id="password"
            placeholder="Password"
            value=""
            name="password"
            rules={[
                Rule.required(),
                Rule.minLen(8),
                Rule.maxLen(12),
                Rule.regexExp(noSpecialCharacterRegex, "Field cannot include special characters"),
                Rule.regexExp(atLeastOneLetterRegex, "At least one character"),
                Rule.regexExp(atLeastOneNumberRegex, "At least one number"),
            ]}
        />
        <div className="w-full border-t-2 border-gray-300 self-baseline mt-6" />
        <div className="flex justify-between items-center p-3">
            <h4 className="font-bold text-gray-900 text-xl">Security Questions</h4>
            <span className="rounded-full text-white bg-gray-900 w-5 h-5 flex justify-center items-center">i</span>
        </div>
        <Input
            type={InputType.text}
            id="motherName"
            placeholder="Your mother's maiden name"
            value=""
            name="motherName"
            rules={[Rule.required(), Rule.minLen(2), Rule.maxLen(30), Rule.regexExp(onlyLettersRegex, "Only letters")]}
        />
        <Input
            type={InputType.text}
            id="placeOfBirth"
            placeholder="Your place of birth"
            value=""
            name="placeOfBirth"
            rules={[Rule.required(), Rule.minLen(2), Rule.maxLen(30), Rule.regexExp(onlyLettersRegex, "Only letters")]}
        />
        <div className="w-full border-t-2 border-gray-300 self-baseline mt-6" />
        <div className="flex justify-between items-center p-3">
            <h4 className="font-bold text-gray-900 text-xl">Marketing Preferences</h4>
        </div>
        <InputCheckbox name="showFirstName" id="showFirstName" value="showFirstName" rules={[]} label="I am happy for my first name to be show on the side if I win" />
    </section>
);

export default AccountDetails;
