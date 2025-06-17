import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "./Store/actions";

/**
 * Connection Change Listener Hook
 */
export const OnlineStatusProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { app } = useSelector((state) => state);

    useEffect(() => {
        // initialiaze connection
        dispatch(
            actions.app.create.update({ netConnected: window.navigator.onLine })
        );

        window.addEventListener("offline", () => {
            dispatch(actions.app.create.update({ netConnected: false }));
        });
        window.addEventListener("online", () => {
            dispatch(actions.app.create.update({ netConnected: true }));
        });

        return () => {
            window.removeEventListener("offline", () => {
                actions.app.create.update({ netConnected: false });
            });
            window.removeEventListener("online", () => {
                actions.app.create.update({ netConnected: true });
            });
        };
    }, [dispatch]);

    // Important. We need to make sure that ReduxState from DB gets loaded first
    if (!app.reduxStateLoaded) return null;

    return <>{children}</>;
};
