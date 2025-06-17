export const actionTypes = {
  APP_SETTINGS_SET: 'APP_SETTINGS_SET',
};

export const actionCreators = {
  set: (appSetting: any) => ({
    type: actionTypes.APP_SETTINGS_SET,
    payload: { appSetting },
  }),
};

export default {
  create: actionCreators,
  type: actionTypes,
};
