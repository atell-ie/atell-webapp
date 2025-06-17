import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();

initialState.data = [
    {
        id: 1,
        lastName: "Snow",
        firstName: "Jon",
        preferredName: "Jon",
        age: 35
    },
    {
        id: 2,
        lastName: "Lannister",
        firstName: "Cersei",
        preferredName: "Jon",
        age: 42
    },
    {
        id: 3,
        lastName: "Lannister",
        firstName: "Jaime",
        preferredName: "Jon",
        age: 45
    },
    {
        id: 4,
        lastName: "Stark",
        firstName: "Arya",
        preferredName: "Jon",
        age: 16
    },
    {
        id: 5,
        lastName: "Targaryen",
        firstName: "Daenerys",
        preferredName: "Jon",
        age: null
    },
    {
        id: 6,
        lastName: "Melisandre",
        firstName: null,
        preferredName: "Jon",
        age: 150
    },
    {
        id: 7,
        lastName: "Clifford",
        firstName: "Ferrara",
        preferredName: "Jon",
        age: 44
    },
    {
        id: 8,
        lastName: "Frances",
        firstName: "Rossini",
        preferredName: "Jon",
        age: 36
    },
    {
        id: 9,
        lastName: "Roxie",
        firstName: "Harvey",
        preferredName: "Jon",
        age: 65
    },
    {
        id: 10,
        lastName: "Targaryen",
        firstName: "Daenerys",
        preferredName: "Jon",
        age: null
    },
    {
        id: 11,
        lastName: "Melisandre",
        firstName: null,
        preferredName: "Jon",
        age: 150
    },
    {
        id: 12,
        lastName: "Clifford",
        firstName: "Ferrara",
        preferredName: "Jon",
        age: 44
    },
    {
        id: 13,
        lastName: "Frances",
        firstName: "Rossini",
        preferredName: "Jon",
        age: 36
    },
    {
        id: 14,
        lastName: "Roxie",
        firstName: "Harvey",
        preferredName: "Jon",
        age: 65
    },
    {
        id: 15,
        lastName: "Targaryen",
        firstName: "Daenerys",
        preferredName: "Jon",
        age: null
    },
    {
        id: 16,
        lastName: "Melisandre",
        firstName: null,
        preferredName: "Jon",
        age: 150
    },
    {
        id: 17,
        lastName: "Clifford",
        firstName: "Ferrara",
        preferredName: "Jon",
        age: 44
    },
    {
        id: 18,
        lastName: "Frances",
        firstName: "Rossini",
        preferredName: "Jon",
        age: 36
    },
    {
        id: 19,
        lastName: "Roxie",
        firstName: "Harvey",
        preferredName: "Jon",
        age: 65
    }
];

export default function (state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.USER_ITEM_SET: {
            const { audit } = action.payload;
            return { ...state, item: patient };
        }
        case actionTypes.USERS_SELECT_SUCCESS: {
            const { users } = action.payload;
            return list.getReducer(state, users);
        }
        case actionTypes.USERS_CREATE_SUCCESS: {
            const { newPatient } = action.payload;

            const newState = [...state.data];
            newState.unshift({
                id: 20,
                lastName: newPatient.name,
                firstName: newPatient.surname,
                age: 30
            });

            return { ...state, data: newState };
        }
        case actionTypes.USERS_WRITE_SUCCESS: {
            const { users } = action.payload;
            return list.mergeReducer(state, users);
        }
        default: {
            return state;
        }
    }
}
