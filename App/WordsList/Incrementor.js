import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import actions from "../Store/actions";

const Incrementor = React.memo(({ index }) => {
    const dispatch = useDispatch();

    const { targetWordsList } = useSelector((state) => state);

    const { words } = targetWordsList.item;

    const hdlIncrement = useCallback(() => {
        if (words[index].noOfInstances === 9) return;

        // Create new array with updated item instead of mutating
        const newWords = words.map((word, i) =>
            i === index
                ? { ...word, noOfInstances: word.noOfInstances + 1 }
                : word
        );

        dispatch(
            actions.targetWordsList.create.itemSet({
                ...targetWordsList.item,
                words: newWords
            })
        );
    }, [dispatch, words, index, targetWordsList.item]);

    const handleDecrement = useCallback(() => {
        if (words[index].noOfInstances === 1) return;

        // Create new array with updated item instead of mutating
        const newWords = words.map((word, i) =>
            i === index
                ? { ...word, noOfInstances: word.noOfInstances - 1 }
                : word
        );

        dispatch(
            actions.targetWordsList.create.itemSet({
                ...targetWordsList.item,
                words: newWords
            })
        );
    }, [dispatch, words, index, targetWordsList.item]);

    return (
        <ButtonGroup size="small" aria-label="insntance button group">
            <Button onClick={handleDecrement}>-</Button>
            <Button disabled>{words[index].noOfInstances}</Button>
            <Button onClick={hdlIncrement}>+</Button>
        </ButtonGroup>
    );
});

export default Incrementor;
