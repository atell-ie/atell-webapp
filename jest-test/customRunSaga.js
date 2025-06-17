import { runSaga } from "redux-saga";

const customRunSaga = async (saga, initAction) => {
    const dispatched = [];
    await runSaga(
        {
            dispatch: (action) => dispatched.push(action),
        },
        saga,
        initAction
    ).toPromise();

    return dispatched;
};

export default customRunSaga;
