import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
    Box,
    Menu,
    MenuItem,
    ToggleButton,
    ClickAwayListener,
    CircularProgress
} from "@mui/material";
import actions from "../../Store/actions";

import styles from "./styles";

const InstancePhoneme = ({ instanceId }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [btnState, setBtnState] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [phonemeSelected, setPhonemeSelected] = useState(null);

    const { resultsManager, wordIpas, typesList, analysisPhonemes } =
        useSelector((state) => state);
    const { selectedTargetWordId, selectedResult } = resultsManager;
    const { ipas, disorderSubcategories } = typesList;

    const open = Boolean(anchorEl);

    const phonemes = useMemo(() => {
        return wordIpas.data.filter(
            (item) => item.word === parseInt(selectedTargetWordId)
        );
    }, [wordIpas, selectedTargetWordId]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const hdlPhonemeToggle = (phoneme) => (event) => {
        const { value } = event.target;

        // update button state
        const updBtnState = { ...btnState };
        updBtnState[value] = 1;
        setBtnState(updBtnState);

        // show menu
        setAnchorEl(event.currentTarget);

        setPhonemeSelected(phoneme);
    };

    const idToIpa = (ipaId) => {
        const index = ipas.byId[ipaId];
        return ipas.data[index].ipa;
    };

    const hasError = (phoneme) => {
        const index = analysisPhonemes.byId[`${instanceId}-${phoneme.id}`];
        if (!index) return false;

        const ap = analysisPhonemes.data[index];
        return instanceId === ap.resultTarget && ap.active;
    };

    const hdlDisorderClick = (disorderSubcategoryId) => () => {
        const wordipaId = phonemeSelected.id;

        const phonemeUpdate = {
            word_ipa: wordipaId,
            result_target: instanceId,
            result: selectedResult,
            disorder_subcategory: disorderSubcategoryId,
            active: !!disorderSubcategoryId
        };

        dispatch(
            actions.analysisPhonemes.create.updateAnalysisResultWordIpa(
                phonemeUpdate
            )
        );

        handleClose();
    };

    if (resultsManager.analysisLoading) {
        return (
            <Box>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", flexFlow: "row" }}>
            {phonemes.map((phoneme) => {
                return (
                    <ToggleButton
                        key={phoneme.id}
                        color="primary"
                        value={phoneme.id}
                        selected={hasError(phoneme)}
                        onChange={hdlPhonemeToggle(phoneme)}
                        sx={styles.phoneme}
                        aria-controls={open ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        {idToIpa(phoneme.ipa)}
                    </ToggleButton>
                );
            })}
            {/* </Box> */}
            <ClickAwayListener onClickAway={() => {}}>
                <Menu id="fade-menu" anchorEl={anchorEl} open={open}>
                    <MenuItem key="0" onClick={hdlDisorderClick(null)}>
                        {t("none")}
                    </MenuItem>
                    {disorderSubcategories.data.map((item) => {
                        return (
                            <MenuItem
                                key={item.id}
                                onClick={hdlDisorderClick(item.id)}
                            >
                                {item.name}
                            </MenuItem>
                        );
                    })}
                </Menu>
            </ClickAwayListener>
        </Box>
    );
};

export default InstancePhoneme;
