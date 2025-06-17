import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import actions from "../Store/actions";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material/";
import { useToaster } from "../common/hooks";
import makeStyles from "@mui/styles/makeStyles";
import { useTranslation } from "react-i18next";
import styles from "./styles.js";

export default () => {
    let navigate = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    // const { audits } = useSelector((state) => state);
    const toast = useToaster();
    const dispatch = useDispatch();
    const classes = makeStyles(styles)();

    return (
        <>
            <Typography paragraph>Billing page</Typography>
        </>
    );
};
