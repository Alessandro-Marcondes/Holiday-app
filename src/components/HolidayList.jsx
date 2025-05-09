import { useContext, useState } from "react";
import { HolidayContext } from "../contexts/HolidayContext";
import HolidayCard from "./HolidayCard";
import { CircularProgress, Typography, TextField, Box, Button, Select, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import styled from 'styled-components';

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
    return holidays.filter((holiday) => {

      const monthMatch = filterMonth ? dayjs(holiday.date).month() + 1 === parseInt(filterMonth) : true;
      const typeMatch = filterType ? Array.isArray(holiday.types) && holiday.types.includes(filterType) : true;
      return monthMatch && typeMatch;

    });
  }



  const filteredHolidays = filterHolidays();

  return (
    <StyledWrapper>
      <Box className="container">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            {searchHistory.length > 0 && (
              <>
                <Box className="filters">
                  <TextField
                    label="Filtrar por mês"
                    type="number"
                    value={filterMonth}
                    onChange={(e) => setFilterMonth(e.target.value)}
                    helperText="Digite o número do mês (1-12)"
                    inputProps={{
                      min: 1,
                      max: 12
                    }}
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
                  <Button onClick={() => { setFilterMonth(""); setFilterType(""); }}>
                    Limpar Filtros
                  </Button>
                </Box>

                {filteredHolidays.length === 0 ? (
                  <Typography>Nenhum feriado encontrado para essa busca.</Typography>
                ) : (
                  filteredHolidays.map((holiday, index) => (
                    <HolidayCard
                      key={holiday.date}
                      holiday={holiday}
                      total={holidays.length}
                      index={index + 1}
                    />
                  ))
                )}
              </>
            )}
          </>
        )}
      </Box>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container{
  display: block;
  margin-top: 7em;
}
  .filters {
    margin-bottom: 3em;
  }`