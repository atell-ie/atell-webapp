import { useState, useEffect } from "react";

/**
 * Check if Scrolling bar is present when content is higher than the root
 * element. Assuming that screen is not dynamically resizable
 */
export default (elementId: string) => {
    const [isScrollingPresent, setIsScrollingPresent] = useState(false);

    useEffect(() => {
        // outerElement as defined in Screen component
        const outerElement = document.getElementById("screen-outer-wrp");
        const element = document.getElementById(elementId);

        if (!element || !outerElement) return;

        if (element.scrollHeight > outerElement.clientHeight) {
            setIsScrollingPresent(true);
        }
    }, [elementId]);

    return isScrollingPresent;
};
