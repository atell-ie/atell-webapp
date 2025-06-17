import React, { useEffect } from "react";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import createReduxWaitForMiddleware from "redux-wait-for-action";
import * as Sentry from "@sentry/react";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";
import { db } from "../common/lib";
import { get, update } from "idb-keyval";

const sagaMiddleware = createSagaMiddleware();
const waitForMiddleware = createReduxWaitForMiddleware();

const enhancer = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
    applyMiddleware(sagaMiddleware, waitForMiddleware, actionInterceptor)
);
export const store = createStore(rootReducer, enhancer);

const updateReduxIDB = async (currentState) => {
    try {
        // await update(db.types.reduxState, (updatedReduxState = []) => {
        //     /** Deleting state which is not used  */
        //     const newState = { ...currentState };
        //     delete newState.auth; // auth is already saved in localStorage
        //     delete newState.app;
        //     return newState;
        // });
    } catch (error) {
        Sentry.captureException(error);
        console.log(error);
    }
};

/** Interceptor middleware recording the state  */
function actionInterceptor({ getState }) {
    return (next) => (action) => {
        const returnValue = next(action);
        /** Update store on conditional reduxState Updates */
        if (action.saveReduxState) {
            updateReduxIDB(getState());
        }
        return returnValue;
    };
}

/**
 * Redux Store Component
 * @param {Props} props
 */

sagaMiddleware.run(rootSaga);
/** Load state if the path has audit */
export default ({ children }: Props) => {
    useEffect(() => {
        /** Check for the existing state else load the new state  */

        const promise = get(db.types.reduxState);
        /** Getting the data from IDB */
        /*
            TODO: On reload if user wants to start fresh there is no way to block saving the redux state
            
        */

        promise.then((data) => {
            store.dispatch({
                type: "UPDATE_REDUX_TREE",
                payload: { reduxState: Boolean(data) ? data : {} }
            });
        });

        window.addEventListener("beforeunload", () => {
            return updateReduxIDB(store.getState());
        });

        return () => {
            window.removeEventListener("beforeunload", () =>
                updateReduxIDB(store.getState())
            );
        };
    }, []);

    return <Provider store={store}>{children}</Provider>;
};
/**
 * Redux Store Instance
 */
type Props = {
    children: React.ReactNode
};
