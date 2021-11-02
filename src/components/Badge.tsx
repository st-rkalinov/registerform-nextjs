import React from "react";

export enum BadgeType {
    success = "success",
    error = "error",
}

interface IProps {
    badgeType: BadgeType;
}

const getBadgeContent = (badgeType: BadgeType) => {
    const badgeTypeSuccessJSX = (
        <div
            className="inline-block rotate-45 w-1 h-2.5 border-b-2 border-r-2 border-white"
            data-testid="badge-success"
        />
    );
    const badgeTypeErrorJSX = (
        <div data-testid="badge-error">X</div>
    );

    switch (badgeType) {
        case BadgeType.success:
            return badgeTypeSuccessJSX;
        case BadgeType.error:
            return badgeTypeErrorJSX;
        default:
            return "";
    }
};

const getBadgeWrapperClasses = (badgeType: BadgeType) => {
    const successBadgeClasses = "inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-green-600 rounded-full absolute top-0 right-0";
    const errorBadgeClasses = "inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-600 rounded-full absolute top-0 right-0";

    switch (badgeType) {
        case BadgeType.success:
            return successBadgeClasses;
        case BadgeType.error:
            return errorBadgeClasses;
        default:
            return "";
    }
};

const Badge: React.FC<IProps> = ({
    badgeType,
}) => {
    const badgeWrapperClasses = getBadgeWrapperClasses(badgeType);
    const badgeContent = getBadgeContent(badgeType);

    return (
        <span className={badgeWrapperClasses}>
            {badgeContent}
        </span>
    );
};

export default Badge;
