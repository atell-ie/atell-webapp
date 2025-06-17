import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../Store/actions";
import { Chip, Grid, Typography, IconButton } from "@mui/material/";
import Box from "@mui/material/Box";
import listOfPhonemes from "./listOfPhonemes";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

// TODO: need to save the results of Treatment Phoneme constructor

const PhonemesConstructor = () => {
    const dispatch = useDispatch();

    const [value, setValue] = useState("1");
    const [dailyLimit, setDailyLimit] = useState(1);
    const [exerCount, setExerCount] = useState(15);

    const [phonemes, setPhonemes] = useState([
        ...listOfPhonemes.consonants,
        ...listOfPhonemes.vowels
    ]);
    const [alignment, setAlignment] = useState("consonants");

    const { assignments } = useSelector((state) => state);

    const { sourceDetails } = assignments.item;

    const hdlToggleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const selected = phonemes.filter((item) => item.selected);

    const consonants = listOfPhonemes.consonants.filter(
        (item) => !item.isVowel && !item.selected
    );
    const vowels = listOfPhonemes.vowels.filter(
        (item) => item.isVowel && !item.selected
    );

    const handleClick = (index) => () => {
        const newPhonemes = [...phonemes];
        newPhonemes[index]["selected"] = true;
        setPhonemes(newPhonemes);
    };

    const hdlUnselect = (index) => () => {
        const newPhonemes = [...phonemes];
        newPhonemes[index]["selected"] = false;
        setPhonemes(newPhonemes);
    };

    const hdlExerciseRate = (e) => {
        const { value } = e.target;
        setExerCount(value);
        // const newSourceDetails = { ...sourceDetails };
        // newSourceDetails.exercisesInUse = value;
        // dispatch(
        //     actions.assignments.create.itemSet({
        //         ...assignments.item,
        //         sourceDetails: newSourceDetails
        //     })
        // );
    };

    const hdlDecrease = () => {
        if (dailyLimit > 1) setDailyLimit(dailyLimit - 1);
    };

    const hdlIncrease = () => {
        if (dailyLimit < 5) setDailyLimit(dailyLimit + 1);
    };

    const duration = useMemo(() => {
        const count = Math.ceil(sourceDetails.exercisesInUse * 0.01 * 60);
        var days = Math.ceil((selected.length * count) / dailyLimit);
        var weeks = Math.ceil(days / 5);
        return weeks;
    }, [selected, exerCount, dailyLimit]);

    return (
        <Grid container>
            <Grid item xs={6} sx={{ padding: "1rem" }}>
                <Box>
                    <Typography
                        variant="h6"
                        component="h6"
                    >{`Estimated treatment duration`}</Typography>
                    <Typography
                        variant="subtitle1"
                        component="h2"
                        sx={{
                            background: "#eee",
                            padding: ".5rem",
                            width: "30%",
                            borderRadius: "0.3rem",
                            justifyContent: "center",
                            display: "flex",
                            marginTop: "1rem"
                        }}
                    >
                        {`${duration} weeks`}
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={6} sx={{ padding: "1rem" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <Typography sx={{ paddingBottom: "1rem" }}>
                            Exercise daily limit
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={hdlDecrease}
                                sx={{
                                    border: "1px solid #eee",
                                    borderRadius: "0.3rem",
                                    padding: "0.5rem"
                                }}
                            >
                                <RemoveIcon fontSize="inherit" />
                            </IconButton>
                            <Box sx={{ padding: ".5rem 1rem" }}>
                                {dailyLimit}
                            </Box>
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={hdlIncrease}
                                sx={{
                                    border: "1px solid #eee",
                                    borderRadius: "0.3rem",
                                    padding: "0.5rem"
                                }}
                            >
                                <AddIcon fontSize="inherit" />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{ paddingBottom: "1rem" }}>
                            % of exercises in use
                        </Typography>
                        <ToggleButtonGroup
                            color="primary"
                            value={exerCount}
                            exclusive
                            onChange={hdlExerciseRate}
                            aria-label="Platform"
                        >
                            <ToggleButton value="25" sx={{ lineHeight: 1 }}>
                                25%
                            </ToggleButton>
                            <ToggleButton value="50" sx={{ lineHeight: 1 }}>
                                50%
                            </ToggleButton>
                            <ToggleButton value="100" sx={{ lineHeight: 1 }}>
                                100%
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Box>
            </Grid>
            <Grid
                item
                xs={6}
                sx={{
                    // border: "1px solid #eee",
                    padding: "1rem"
                }}
            >
                <Box>
                    <Typography>{`Selected phonemes:`}</Typography>
                </Box>
                <Box sx={{ paddingTop: "1rem" }}>
                    {selected.map((item) => {
                        return (
                            <Chip
                                key={item.id}
                                label={item.ipa}
                                onClick={hdlUnselect(item.id - 1)}
                                variant="contained"
                                sx={{
                                    padding: "1rem 0.5rem",
                                    margin: "0.3rem 0.5rem",
                                    flexGrow: "1",
                                    borderRadius: ".3rem"
                                }}
                            />
                        );
                    })}
                </Box>
            </Grid>
            <Grid item xs={6} sx={{ padding: "1rem" }}>
                <Box
                    sx={{
                        width: "100%",
                        typography: "body1",
                        height: "18rem"
                    }}
                >
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={hdlToggleChange}
                        aria-label="Platform"
                        sx={{ width: "100%" }}
                    >
                        <ToggleButton value="consonants" sx={{ width: "50%" }}>
                            Consonants
                        </ToggleButton>
                        <ToggleButton value="vowels" sx={{ width: "50%" }}>
                            Vowels
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Box
                        sx={{
                            display:
                                alignment === "consonants" ? "flex" : "none",
                            flexWrap: "wrap",
                            padding: "1rem 0"
                        }}
                    >
                        {consonants.map((item) => {
                            return (
                                <Chip
                                    key={item.id}
                                    label={item.ipa}
                                    onClick={handleClick(item.id - 1)}
                                    variant="outlined"
                                    sx={{
                                        padding: "1rem 0.5rem",
                                        margin: "0.3rem 0.5rem",
                                        flexGrow: "1",
                                        borderRadius: ".3rem"
                                    }}
                                />
                            );
                        })}
                    </Box>
                    <Box
                        sx={{
                            display: alignment === "vowels" ? "flex" : "none",
                            flexWrap: "wrap",
                            padding: "1rem 0"
                        }}
                    >
                        {vowels.map((item) => {
                            return (
                                <Chip
                                    key={item.id}
                                    label={item.ipa}
                                    onClick={handleClick(item.id - 1)}
                                    variant="outlined"
                                    sx={{
                                        padding: "1rem 0.5rem",
                                        margin: "0.3rem 0.5rem",
                                        flexGrow: "1",
                                        borderRadius: ".3rem"
                                    }}
                                />
                            );
                        })}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PhonemesConstructor;
