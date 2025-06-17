export const actionTypes = {
  APP_STATE_UPDATE: 'APP_STATE_UPDATE',
};

export const actionCreators = {
  update: (appState: any) => ({
    type: actionTypes.APP_STATE_UPDATE,
    payload: { appState },
  }),
};

export default {
  create: actionCreators,
  type: actionTypes,
};
