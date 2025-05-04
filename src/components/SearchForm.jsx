import { useState, useContext, useEffect } from "react";
import { HolidayContext } from "../contexts/HolidayContext";
import { TextField, Button, Box, Autocomplete, CircularProgress, Avatar } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


export default function SearchForm() {
    const { dispatch } = useContext(HolidayContext);
    const [country, setCountry] = useState("");
    const [countriesList, setCountriesList] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(true);
    const [year, setYear] = useState(null);


    //Carregar países disponíveis na API
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://date.nager.at/api/v3/AvailableCountries");
                const data = await res.json();
                setCountriesList(data);
            } catch (err) {
                console.log("Erro ao buscar os paises", err);
            } finally {
                setLoadingCountries(false);
            }
        };
        fetchCountries();
    }, []);

    //Evento de buscar
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!year || !country) {
            dispatch({ type: "FETCH_ERROR", payload: "Preencha os campos" });

            return;
        }

        dispatch({ type: "FETCH_START" });


        //Busca os feriados na API do pais e ano
        try {

            if (year < 1975 || year > 2075) {
                dispatch({ type: "FETCH_ERROR", payload: " Insira uma data entre 1975 e 2075" });
                return;
            }

            const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`);


            if (!res.ok) {
                dispatch({ type: "FETCH_ERROR", payload: "Erro ao consultar API" });
                return;
            }

            const data = await res.json();
            dispatch({ type: "FETCH_SUCCESS", payload: data });


            console.log("Adicionando ao historico:", {year, country});
            dispatch({ type: "ADD_HISTORY", payload: { year, country } });


        }
        catch (err) {
            dispatch({ type: "FETCH_ERROR", payload: err.message });
        }


    };


    return (
        <Box component="form" onSubmit={handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    views={['year']}
                    label="Ano"
                    value={year ? dayjs().year(year) : null}
                    onChange={(newValue) => setYear(newValue.year())}
                    minDate={dayjs('1975-01-01')}
                    maxDate={dayjs('2075-12-31')}
                    renderInput={(params) => <TextField {...params} />}

                />
            </LocalizationProvider>

            <Autocomplete
                options={countriesList}
                loading={loadingCountries}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => setCountry(newValue.countryCode)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="País"
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loadingCountries ? <CircularProgress size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                renderOption={(props, option) => (

                    <Box component="li" {...props}>
                        <Avatar
                            src={`https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png`}
                            sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        {option.name} ({option.countryCode})
                    </Box>
                )}
            />

            <Button variant="contained" type="submit">Buscar</Button>
        </Box>
    );
}