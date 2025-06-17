import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { useAuthenticated } from "../common/hooks";
import config from "../config";
import actions from "../Store/actions";
import { ReAuthenticateDialog, AppFrame } from "../common/components";

/**
 * Auth Component
 */
const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { hasAccessToken, isExpired, user } = useAuthenticated();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!hasAccessToken) {
            return navigate(`/${config.paths.login}`);
        }

        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(actions.auth.create.loadSession(user)),
                    dispatch(actions.typesList.create.getRequest()),
                    dispatch(actions.wordsList.create.getWordsRequest())
                ]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {!isExpired && (
                <AppFrame>
                    {loading ? <LinearProgress size={64} /> : <Outlet />}
                </AppFrame>
            )}
            <ReAuthenticateDialog />
        </>
    );
};

export default Auth;
