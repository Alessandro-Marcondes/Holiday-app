import { useContext, useState } from "react";
import { HolidayContext } from "../contexts/HolidayContext";
import HolidayCard from "./HolidayCard";
import { CircularProgress, Typography, TextField , Box, Button, Select, MenuItem} from "@mui/material";
import dayjs from "dayjs";

export default function HolidayList() {
  const { state } = useContext(HolidayContext);
  const { holidays, loading, error, searchHistory } = state;


  const [filterMonth, setFilterMonth] = useState("");
  const [filterType, setFilterType] = useState("");
  const holidayTypes = [
    "Public",
    "Bank",
    "School",
    "Optional"
  ]

  const filterHolidays = () => {
    return holidays.filter((holiday) =>{
      
      const monthMatch = filterMonth ? dayjs(holiday.date).month() + 1 === parseInt(filterMonth) :true;
      const typeMatch = filterType ? Array.isArray(holiday.types) && holiday.types.includes(filterType) : true;
      return monthMatch && typeMatch;

    });
  }


  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (searchHistory.length > 0 && holidays.length === 0) return <Typography>Nenhum feriado encontrado para essa busca.</Typography>;

  const filteredHolidayes = filterHolidays();

  return (
    <Box>
      <Box>
        <TextField
          label="Filtrar por mês"
          type="number"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          helperText="Digite o número do mês (1-12)"
        />
        <Select
            value={filterType}
            label="Tipo de feriado"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            {holidayTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        <Button onClick={() => { setFilterMonth(""); setFilterType(""); }} >Limpar Filtros</Button>
      </Box>

      {filteredHolidayes.length === 0 ? (
  <Typography>Nenhum feriado encontrado com os filtros aplicados.</Typography>
) : (
  filteredHolidayes.map((holiday) => (
    <HolidayCard key={holiday.date} holiday={holiday} />
  ))
)}
    </Box>
  );
}
