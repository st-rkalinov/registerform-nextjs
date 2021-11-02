import React from "react";
import { render, screen } from "@testing-library/react";
import Badge, { BadgeType } from "@src/components/Badge/Badge";

describe("Badge component", () => {
    it("should render the badge component", () => {
        render(
            <Badge badgeType={BadgeType.success} />,
        );

        const badgeContainer = screen.getByTestId("badge-success");
        expect(badgeContainer).toBeInTheDocument();
    });

    it.each([
        [BadgeType.success, "badge-success"],
        [BadgeType.error, "badge-error"],
    ])("should render the correct badge depending on the badgeTypePropertyPassed", (badgeType, testId) => {
        render(
            <Badge badgeType={badgeType} />,
        );

        const badgeContainer = screen.getByTestId(testId);

        expect(badgeContainer).toBeInTheDocument();
    });
});
