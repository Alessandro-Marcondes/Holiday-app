import { createContext, useReducer } from "react";

export const HolidayContext = createContext();

const initialState = {
    holidays: [],
    loading: false,
    error: null,
    searchHistory: []
};

function holidayReducer(state, action) {
    switch (action.type) {

        case "FETCH_START":
            return {
                ...state,
                holidays: [],
                loading: true,
                error: null,
            };

        case "FETCH_SUCCESS":
            return {
                ...state,
                holidays: action.payload,
                loading: false,
                error: null,
            };

        case "FETCH_ERROR":
            return { ...state, error: action.payload, loading: false };

        case "ADD_HISTORY":
            return {
                ...state,searchHistory: [...state.searchHistory, action.payload]
            };

        default: return state;
    }
}

export const HolidayProvider = ({ children }) => {
    const [state, dispatch] = useReducer(holidayReducer, initialState);

    return (
        <HolidayContext.Provider value={{ state, dispatch }} >
            {children}
        </HolidayContext.Provider>
    );
};