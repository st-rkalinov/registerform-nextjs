import React from "react";
import { JSX } from "@babel/types";
import Register from "@src/pages/register";

export enum RegistrationStepText {
    AccountDetails = "ACCOUNT DETAILS",
    UserDetails = "USER DETAILS",
    ContactDetails = "CONTACT DETAILS",
}

const Home: () => JSX.Element = () => (
    <Register />
);

export default Home;
