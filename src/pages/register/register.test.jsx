import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@src/pages/index';
import Register from "@src/pages/register/index";

describe("Register Page", () => {
    it("should render register component successfully", () => {
        const { getByRole } = render(<Register />)
        const registerHeading = getByRole("heading", { level: 1});

        expect(registerHeading.innerHTML).toEqual("Register")
    });
});
