import { useContext } from "react";
import { HolidayContext } from "../contexts/HolidayContext";
import HolidayCard from "./HolidayCard";
import { CircularProgress, Typography } from "@mui/material";

export default function HolidayList() {
  const { state } = useContext(HolidayContext);
  const { holidays, loading, error } = state;

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (holidays.length === 0) return <Typography>Nenhum feriado encontrado.</Typography>;

  return (
    <>
      {holidays.map((holiday) => (
        <HolidayCard key={holiday.date} holiday={holiday} />
      ))}
    </>
  );
}
