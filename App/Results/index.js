import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../Store/actions";

import { Box, CircularProgress } from "@mui/material";

const Results = () => {
    const dispatch = useDispatch();
    const { sessionId } = useParams();
    const { results } = useSelector((state) => state);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if data is already loaded for this session
        if (results.data && results.data.length > 0) {
            setLoading(false);
            // Set the selected result if not already set
            if (results.data[0]?.analysisResult) {
                dispatch(
                    actions.resultsManager.create.update({
                        selectedResult: results.data[0].analysisResult
                    })
                );
            }
        } else {
            // Fetch data only if not already available
            const fetchData = async () => {
                try {
                    const { resultsData } = await dispatch(
                        actions.results.create.getResults(sessionId)
                    );
                    setLoading(false);

                    if (resultsData && resultsData[0]?.analysisResult) {
                        dispatch(
                            actions.resultsManager.create.update({
                                selectedResult: resultsData[0].analysisResult
                            })
                        );
                    }
                } catch (error) {
                    console.error("Error fetching results:", error);
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [sessionId, results.data, dispatch]);

    if (loading)
        return (
            <Box>
                <CircularProgress />
            </Box>
        );

    return <Outlet />;
};

export default Results;
