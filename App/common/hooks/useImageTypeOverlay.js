import React from "react";
import { useSelector } from "react-redux";
import images from "../images";

/**
 * Use Image-type Overlay Hook
 */
export default (imageTypeId: number) => {
    const { imageTypeIdentifiers } = useSelector((state) => state.typesList);
    const next = React.useMemo(() => {
        const visible = imageTypeIdentifiers.data.filter(
            (item) => item.imageTypeId === imageTypeId
        );

        return visible.length ? images.overlay.identifier : null;
    }, [imageTypeIdentifiers, imageTypeId]);

    return next;
};
