export const actionTypes = {
    UPDATE: "UPDATE",
    UPDATE_INDEX: "UPDATE_INDEX"
};

export const actionCreators = {
    update: (data) => ({
        type: actionTypes.UPDATE,
        payload: { data }
    }),
    updateIndex: (index) => ({
        type: actionTypes.UPDATE_INDEX,
        payload: { index }
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
