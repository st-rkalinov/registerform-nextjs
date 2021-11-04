import { Dispatch, useState } from "react";

interface IUseIsTouched {
    isTouched: boolean,
    setIsTouched: Dispatch<any>;
}

const useIsTouched = (): IUseIsTouched => {
    const [isTouched, setIsTouched] = useState(false);

    return { isTouched, setIsTouched };
};

export default useIsTouched;
