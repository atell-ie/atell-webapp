import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import actions from "../Store/actions";

const Incrementor = ({ index }) => {
    const dispatch = useDispatch();

    const { targetWordsList } = useSelector((state) => state);

    const { words } = targetWordsList.item;

    const hdlIncrement = () => {
        if (words[index].noOfInstances === 9) return;

        words[index].noOfInstances = words[index].noOfInstances + 1;

        dispatch(actions.targetWordsList.create.itemSet({ ...targetWordsList.item }));
    };

    const handleDecrement = () => {
        if (words[index].noOfInstances === 1) return;

        words[index].noOfInstances = words[index].noOfInstances - 1;

        dispatch(actions.targetWordsList.create.itemSet({ ...targetWordsList.item }));
    };

    return (
        <ButtonGroup size="small" aria-label="insntance button group">
            <Button onClick={handleDecrement}>-</Button>
            <Button disabled>{words[index].noOfInstances}</Button>
            <Button onClick={hdlIncrement}>+</Button>
        </ButtonGroup>
    );
};

export default Incrementor;
