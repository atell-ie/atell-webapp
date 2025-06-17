import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import actions from "./Store/actions";
import config from "./config";

/**
 * Logout Component
 */
export default () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actions.auth.create.logout());
        navigate(`/${config.paths.login}`);
    }, []);

    return <></>;
};
