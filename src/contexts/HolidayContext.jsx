import {createContext, useReducer } from "react";

export const HolidayContext = createContext();

const initialState = {
    holidays: [],
    loading: false,
    error: null,
};

function holidayReducer(state, action) {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true, error: null };

        case "FETCH_SUCCESS":
            return { ...state, holidays: action.payload, loading: false };

        case "FETCH_ERROR":
            return { ...state, error: action.payload, loading: false };

        default: return state;
    }
}

export const HolidayProvider = ({ children }) => {
    const [state, dispatch] = useReducer(holidayReducer, initialState);

    return(
        <HolidayContext.Provider value={{ state, dispatch}} >
            {children}
        </HolidayContext.Provider>
    );
};