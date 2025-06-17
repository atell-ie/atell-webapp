import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    JOURNEYS_ITEM_CLEAR: "JOURNEYS_ITEM_CLEAR",
    JOURNEYS_ITEM_SET: "JOURNEYS_ITEM_SET",

    JOURNEYS_GET: "JOURNEYS_GET",
    JOURNEYS_GET_SUCCESS: "JOURNEYS_GET_SUCCESS",
    JOURNEYS_GET_FAILURE: "JOURNEYS_GET_FAILURE",

    JOURNEYS_POST: "JOURNEYS_POST",
    JOURNEYS_POST_SUCCESS: "JOURNEYS_POST_SUCCESS",
    JOURNEYS_POST_FAILURE: "JOURNEYS_POST_FAILURE",

    JOURNEYS_PUT: "JOURNEYS_PUT",
    JOURNEYS_PUT_SUCCESS: "JOURNEYS_PUT_SUCCESS",
    JOURNEYS_PUT_FAILURE: "JOURNEYS_PUT_FAILURE",
};  

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.UPLOAD_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (audit: any) => ({
        type: actionTypes.UPLOAD_ITEM_SET,
        payload: { audit },
        saveReduxState: true
    }),

    getJourneys: () => ({
        type: actionTypes.JOURNEYS_GET,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.JOURNEYS_GET_SUCCESS,
        [ERROR_ACTION]: actionTypes.JOURNEYS_GET_FAILURE
    }),
    getJourneysSuccess: (journeys: any) => ({
        type: actionTypes.JOURNEYS_GET_SUCCESS,
        payload: { journeys },
        saveReduxState: true
    }),
    getJourneysFailure: (error: Error) => ({
        type: actionTypes.JOURNEYS_GET_FAILURE,
        error
    }),

    postJourneys: (journeyData: any) => ({
        type: actionTypes.JOURNEYS_POST,
        payload: { journeyData },
        [WAIT_FOR_ACTION]: actionTypes.JOURNEYS_POST_SUCCESS,
        [ERROR_ACTION]: actionTypes.JOURNEYS_POST_FAILURE
    }),     
    postJourneysSuccess: (newJourneyData: any) => ({
        type: actionTypes.JOURNEYS_POST_SUCCESS,
        payload: { newJourneyData },
        saveReduxState: true
    }),
    postJourneysFailure: (error: Error) => ({
        type: actionTypes.JOURNEYS_POST_FAILURE,
        error
    }),

    putJourneys: (journeyId: int, journeyData: any) => ({
        type: actionTypes.JOURNEYS_PUT,
        payload: { journeyId, journeyData },
        [WAIT_FOR_ACTION]: actionTypes.JOURNEYS_PUT_SUCCESS,
        [ERROR_ACTION]: actionTypes.JOURNEYS_PUT_FAILURE
    }),
    putJourneysSuccess: (updatedJourneyData: any) => ({
        type: actionTypes.JOURNEYS_PUT_SUCCESS,
        payload: { updatedJourneyData },
        saveReduxState: true
    }),
    putJourneysFailure: (error) => ({
        type: actionTypes.JOURNEYS_PUT_FAILURE,
        error
    }),
}
export default {
    create: actionCreators,
    type: actionTypes
};
