import { useState, useContext, useEffect } from "react";
import { HolidayContext } from "../contexts/HolidayContext";
import { TextField, Button, Box } from "@mui/material";

export default function SearchForm() {
    const { state, dispatch } = useContext(HolidayContext);

    const [country, setCountry] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        console.log(state);
    }, [state]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!year || !country) {
            dispatch({ type: "FETCH_ERROR", payload: "Preencha os campos" });

            return;
        }

        dispatch({ type: "FETCH_START" });

        try {
            const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`);
            if (!res.ok) {
                dispatch({ type: "FETCH_ERROR", payload: "Erro ao consultar API" });
                return;
            }

            const data = await res.json();
            dispatch({ type: "FETCH_SUCCESS", payload: data });



        }
        catch (err) {
            dispatch({ type: "FETCH_ERROR", payload: err.message });
        }


    };


    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Ano"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
            />
            <TextField
                label="País"
                value={country}
                onChange={(e) => setCountry(e.target.value.toUpperCase())}
                required
            />
            <Button variant="contained" type="submit">Buscar</Button>
        </Box>
    );
}