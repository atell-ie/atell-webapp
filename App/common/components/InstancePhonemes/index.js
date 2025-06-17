import { useMemo } from "react";
import { useSelector } from "react-redux";

/**
 * Helper function to extract unique target word IDs from results data
 * (same logic as getUniqueTargetWordIgs in Analysis component)
 */
export const getUniqueTargetWordIds = (resultsData = []) => {
    const uniqueIds = {};
    const targetsList = resultsData.filter((item) => item.targetWord);
    targetsList.forEach((item) => {
        if (!uniqueIds[item.targetWord])
            uniqueIds[item.targetWord] = item.targetWord;
    });
    return uniqueIds;
};

/**
 * Custom hook to transform session results data into target word instances structure
 * matching the Analysis component, with phonemes and error information for each instance.
 *
 * @param {Array} resultsData - Array of result items to process
 * @returns {Object} - Object containing grouped data and helper functions with phoneme information
 */
export const useTargetWordInstances = (resultsData = []) => {
    const { wordIpas, typesList, analysisPhonemes } = useSelector(
        (state) => state
    );
    const { ipas, disorderSubcategories } = typesList;

    // Check if we have the required data
    const hasWordIpasData = wordIpas?.data && wordIpas.data.length > 0;
    const hasIpasData = ipas?.data && ipas.data.length > 0;
    const hasAnalysisPhonemesData =
        analysisPhonemes?.data && analysisPhonemes.data.length > 0;

    const processedData = useMemo(() => {
        // Filter items that have targetWord
        const itemsWithTargetWord = resultsData.filter(
            (item) => item.targetWord
        );

        // Group by targetWord ID
        const targetWordInstances = itemsWithTargetWord.reduce((acc, item) => {
            const targetWordId = item.targetWord;

            if (!acc[targetWordId]) {
                acc[targetWordId] = [];
            }

            acc[targetWordId].push(item);
            return acc;
        }, {});

        // If we don't have wordIpas data, return basic structure without phonemes
        if (!hasWordIpasData) {
            console.log("🔍 hasWordIpasData:", hasWordIpasData);
            console.log("🔍 wordIpas.data:", wordIpas?.data);
            console.warn(
                "useTargetWordInstances: wordIpas.data is empty. Phonemes will be empty until data is loaded."
            );

            const basicInstances = Object.keys(targetWordInstances).reduce(
                (acc, targetWordId) => {
                    const instances = targetWordInstances[targetWordId];

                    const basicEnrichedInstances = instances.map(
                        (instance) => ({
                            ...instance,
                            phonemes: [], // Empty until wordIpas data is loaded
                            phonemeCount: 0,
                            errorCount: 0
                        })
                    );

                    acc[targetWordId] = basicEnrichedInstances;
                    return acc;
                },
                {}
            );

            return basicInstances;
        }

        // Get phonemes and errors for each target word instance
        const enrichedTargetWordInstances = Object.keys(
            targetWordInstances
        ).reduce((acc, targetWordId) => {
            const instances = targetWordInstances[targetWordId];

            // Get phonemes for this target word
            const phonemes = wordIpas.data.filter(
                (item) => item.word === parseInt(targetWordId)
            );

            // Helper function to get IPA symbol from ID
            const idToIpa = (ipaId) => {
                if (!hasIpasData) return `/${ipaId}/`;
                const index = ipas.byId[ipaId];
                return index !== undefined && ipas.data[index]
                    ? ipas.data[index].ipa
                    : `/${ipaId}/`;
            };

            // Helper function to check if a phoneme has an error for a specific instance
            const getPhonemeError = (phoneme, instanceId) => {
                if (!hasAnalysisPhonemesData) return null;

                const key = `${instanceId}-${phoneme.id}`;
                const index = analysisPhonemes.byId[key];

                // Debug logging to help troubleshoot
                // if (process.env.NODE_ENV === "development") {
                //     console.log(
                //         `🔍 Checking error for phoneme ${phoneme.id} in instance ${instanceId}:`
                //     );
                //     console.log(`  Key: ${key}`);
                //     console.log(`  Index from byId: ${index}`);
                //     console.log(
                //         `  AnalysisPhonemes keys:`,
                //         Object.keys(analysisPhonemes.byId)
                //     );
                // }

                // Use EXACT same logic as InstancePhoneme hasError function: if (!index) return false;
                // Note: This means index 0 would be falsy and return null, matching the original behavior
                if (!index && index !== 0) return null; // Fixed: explicitly check for index 0

                const analysisPhoneme = analysisPhonemes.data[index];
                if (!analysisPhoneme) {
                    // if (process.env.NODE_ENV === "development") {
                    //     console.log(
                    //         `  ❌ No analysisPhoneme found at index ${index}`
                    //     );
                    // }
                    return null;
                }

                // Check conditions exactly like InstancePhoneme hasError: instanceId === ap.resultTarget && ap.active
                const hasError =
                    instanceId === analysisPhoneme.resultTarget &&
                    analysisPhoneme.active;

                // if (process.env.NODE_ENV === "development") {
                //     console.log(`  AnalysisPhoneme:`, analysisPhoneme);
                //     console.log(
                //         `  Instance match: ${instanceId} === ${
                //             analysisPhoneme.resultTarget
                //         } = ${instanceId === analysisPhoneme.resultTarget}`
                //     );
                //     console.log(`  Active: ${analysisPhoneme.active}`);
                //     console.log(`  Has Error: ${hasError}`);
                // }

                if (!hasError) return null;

                // Get disorder subcategory info
                const disorderSubcategoryId =
                    analysisPhoneme.disorderSubcategory;
                let disorderInfo = null;

                if (disorderSubcategoryId && disorderSubcategories.data) {
                    const disorderIndex =
                        disorderSubcategories.byId[disorderSubcategoryId];
                    if (
                        disorderIndex !== undefined &&
                        disorderSubcategories.data[disorderIndex]
                    ) {
                        disorderInfo =
                            disorderSubcategories.data[disorderIndex];
                    }
                }

                return {
                    id: analysisPhoneme.id,
                    wordIpa: analysisPhoneme.wordIpa,
                    resultTarget: analysisPhoneme.resultTarget,
                    disorderSubcategory: disorderSubcategoryId,
                    disorderInfo,
                    active: analysisPhoneme.active
                };
            };

            // Enrich each instance with phonemes and error data
            const enrichedInstances = instances.map((instance) => {
                const instancePhonemes = phonemes.map((phoneme) => {
                    const error = getPhonemeError(phoneme, instance.id);

                    return {
                        id: phoneme.id,
                        word: phoneme.word,
                        ipa: phoneme.ipa,
                        ipaSymbol: idToIpa(phoneme.ipa),
                        syllable: phoneme.syllable,
                        positionInSyllable: phoneme.positionInSyllable,
                        positionInWord: phoneme.positionInWord,
                        hasError: !!error,
                        error: error
                    };
                });

                return {
                    ...instance,
                    phonemes: instancePhonemes,
                    phonemeCount: instancePhonemes.length,
                    errorCount: instancePhonemes.filter((p) => p.hasError)
                        .length
                };
            });

            acc[targetWordId] = enrichedInstances;
            return acc;
        }, {});

        return enrichedTargetWordInstances;
    }, [
        resultsData,
        wordIpas.data,
        ipas?.byId,
        ipas?.data,
        analysisPhonemes?.byId,
        analysisPhonemes?.data,
        disorderSubcategories?.byId,
        disorderSubcategories?.data,
        hasWordIpasData,
        hasIpasData,
        hasAnalysisPhonemesData
    ]);

    // Additional computed values and helpers
    const computedValues = useMemo(() => {
        const targetWordIds = Object.keys(processedData).map((id) =>
            parseInt(id)
        );
        const selectedTargetWordId = targetWordIds[0] || null;

        // Statistics
        const totalTargetWords = targetWordIds.length;
        const totalInstances = Object.values(processedData).reduce(
            (sum, instances) => sum + instances.length,
            0
        );
        const totalPhonemes = Object.values(processedData).reduce(
            (sum, instances) => {
                return (
                    sum +
                    instances.reduce(
                        (instanceSum, instance) =>
                            instanceSum + instance.phonemeCount,
                        0
                    )
                );
            },
            0
        );
        const totalErrors = Object.values(processedData).reduce(
            (sum, instances) => {
                return (
                    sum +
                    instances.reduce(
                        (instanceSum, instance) =>
                            instanceSum + instance.errorCount,
                        0
                    )
                );
            },
            0
        );

        // Helper functions
        const getWordInstances = (index) => {
            if (index < 0 || index >= targetWordIds.length) return [null, []];
            const targetWordId = targetWordIds[index];
            return [targetWordId, processedData[targetWordId]];
        };

        const getCurrentWordInstances = () => {
            return selectedTargetWordId
                ? processedData[selectedTargetWordId] || []
                : [];
        };

        const isValidIndex = (index) => {
            return index >= 0 && index < targetWordIds.length;
        };

        const getTargetWordIdByIndex = (index) => {
            return isValidIndex(index) ? targetWordIds[index] : null;
        };

        // Phoneme-specific helpers
        const getPhonemesByTargetWord = (targetWordId) => {
            const instances = processedData[targetWordId] || [];
            return instances.length > 0 ? instances[0].phonemes : [];
        };

        const getErrorsByTargetWord = (targetWordId) => {
            const instances = processedData[targetWordId] || [];
            return instances.reduce((errors, instance) => {
                const instanceErrors = instance.phonemes
                    .filter((p) => p.hasError)
                    .map((p) => ({
                        instanceId: instance.id,
                        phoneme: p,
                        error: p.error
                    }));
                return [...errors, ...instanceErrors];
            }, []);
        };

        const getErrorCountByDisorder = () => {
            const disorderCounts = {};

            Object.values(processedData).forEach((instances) => {
                instances.forEach((instance) => {
                    instance.phonemes.forEach((phoneme) => {
                        if (phoneme.hasError && phoneme.error.disorderInfo) {
                            const disorderName =
                                phoneme.error.disorderInfo.name;
                            disorderCounts[disorderName] =
                                (disorderCounts[disorderName] || 0) + 1;
                        }
                    });
                });
            });

            return disorderCounts;
        };

        return {
            targetWordIds,
            selectedTargetWordId,
            totalTargetWords,
            totalInstances,
            totalPhonemes,
            totalErrors,
            getWordInstances,
            currentWordInstances: getCurrentWordInstances(),
            isValidIndex,
            getTargetWordIdByIndex,
            getPhonemesByTargetWord,
            getErrorsByTargetWord,
            getErrorCountByDisorder,
            // Data availability flags
            hasWordIpasData,
            hasIpasData,
            hasAnalysisPhonemesData,
            // Helper to get required word IDs for fetching
            getRequiredWordIds: () => getUniqueTargetWordIds(resultsData)
        };
    }, [
        processedData,
        hasWordIpasData,
        hasIpasData,
        hasAnalysisPhonemesData,
        resultsData
    ]);

    return {
        targetWordInstances: processedData,
        ...computedValues
    };
};

/**
 * Helper hook for fetching required data before using useTargetWordInstances
 * This mimics the data fetching pattern from the Analysis component
 *
 * @param {Array} resultsData - Results data to extract target word IDs from
 * @param {Function} dispatch - Redux dispatch function
 * @param {string} sessionId - Session ID for fetching analysis phonemes (optional)
 * @returns {Object} - Status and helper functions for data fetching
 */
export const useFetchTargetWordData = () => {
    const { wordIpas, analysisPhonemes } = useSelector((state) => state);

    return {
        isWordIpasLoaded: wordIpas?.data && wordIpas.data.length > 0,
        isAnalysisPhonemesLoaded:
            analysisPhonemes?.data && analysisPhonemes.data.length > 0,

        // Helper function to fetch word IPA data (call this before using the main hook)
        fetchWordIpasData: async (dispatch, resultsData) => {
            try {
                const uniqueIds = getUniqueTargetWordIds(resultsData);
                const targetWordIds = Object.keys(uniqueIds).join(",");

                if (targetWordIds) {
                    await dispatch({
                        type: "GET_WORD_IPAS",
                        payload: { targetWordIds }
                    });
                }
            } catch (error) {
                console.error("Failed to fetch word IPA data:", error);
            }
        },

        // Helper function to fetch analysis phonemes data
        fetchAnalysisPhonemesData: async (dispatch, sessionId) => {
            if (!sessionId) return;

            try {
                await dispatch({
                    type: "WORDS_ERRORS_GET",
                    payload: { sessionId }
                });
            } catch (error) {
                console.error("Failed to fetch analysis phonemes data:", error);
            }
        }
    };
};

/**
 * Component wrapper that provides targetWordInstances data
 * Can be used when you need the data as a component rather than a hook
 */
export const InstancePhonemesProvider = ({
    children,
    resultsData,
    initialSelectedIndex = 0
}) => {
    const targetWordData = useTargetWordInstances(
        resultsData,
        initialSelectedIndex
    );

    return children(targetWordData);
};

/**
 * Debug helper function to inspect the state of analysis phonemes data
 * Call this in your component to see what data is available
 */
export const debugAnalysisPhonemes = (analysisPhonemes, instanceId = null) => {
    // console.log("🐛 DEBUG: AnalysisPhonemes State");
    // console.log(
    //     "Has data:",
    //     analysisPhonemes?.data && analysisPhonemes.data.length > 0
    // );
    // console.log("Data length:", analysisPhonemes?.data?.length || 0);
    // console.log("ById keys:", Object.keys(analysisPhonemes?.byId || {}));

    if (analysisPhonemes?.data && analysisPhonemes.data.length > 0) {
        // console.log("Sample entries:", analysisPhonemes.data.slice(0, 3));

        if (instanceId) {
            const instanceKeys = Object.keys(analysisPhonemes.byId).filter(
                (key) => key.startsWith(`${instanceId}-`)
            );
            // console.log(`Keys for instance ${instanceId}:`, instanceKeys);

            instanceKeys.forEach((key) => {
                const index = analysisPhonemes.byId[key];
                const data = analysisPhonemes.data[index];
                console.log(`  ${key} -> index ${index} ->`, data);
            });
        }
    }

    return analysisPhonemes;
};

export default useTargetWordInstances;
