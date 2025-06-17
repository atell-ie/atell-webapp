import { actionTypes } from "./actions";

const initialState = {
    coords: {
        accuracy: -1,
        altitude: -1,
        altitudeAccuracy: -1,
        heading: -1,
        latitude: -1,
        longitude: -1,
        speed: -1,
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.GEO_LOCATION_GET_SUCCESS: {
            const { coords } = action.payload;
            return { coords };
        }
        default: {
            return state;
        }
    }
}
