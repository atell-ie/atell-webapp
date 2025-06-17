import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import actions from "../../Store/actions";

/**
 * Use Toaster Hook
 */
export default function () {
    const dispatch = useDispatch();

    const error = useCallback(
        (message: string) => {
            dispatch(actions.toast.create.error(message));
        },
        [dispatch]
    );

    const info = useCallback(
        (message: string) => {
            dispatch(actions.toast.create.info(message));
        },
        [dispatch]
    );

    const success = useCallback(
        (message: string) => {
            dispatch(actions.toast.create.success(message));
        },
        [dispatch]
    );

    const warning = useCallback(
        (message: string) => {
            dispatch(actions.toast.create.warning(message));
        },
        [dispatch]
    );

    return { error, info, success, warning };
}
