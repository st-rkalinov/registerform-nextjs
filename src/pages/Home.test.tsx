import React from 'react';
import { render } from '@testing-library/react';
import Home from '@src/pages/index';
import Register from "@src/pages/register/index";

describe("Home Page", () => {
    it("should render register component when we are on home page", () => {
        const { getByRole } = render(<Home />)
        const registerHeading = getByRole("heading", { level: 1});

        expect(registerHeading.innerHTML).toEqual("Register")
    });
});
