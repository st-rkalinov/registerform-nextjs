import { Dispatch, useState } from "react";

const useIsTouched = (): [boolean, Dispatch<any>] => {
    const [isTouched, setIsTouched] = useState(false);

    return [isTouched, setIsTouched];
};

export default useIsTouched;
