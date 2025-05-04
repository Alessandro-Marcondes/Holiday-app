import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { HolidayContext } from "../contexts/HolidayContext";

export default function SearchHistory() {
  const { state } = useContext(HolidayContext);
  const { searchHistory } = state;


  const handleHistoryClick = (item) => {

  };

  return (
    <Box>
      <Typography>Histórico de Busca</Typography>
      {searchHistory.length === 0 ? (
        <Typography>Sem histórico de buscas.</Typography>
      ) : (
        <Box>
          {searchHistory.map((item, index) => (
            <Typography>
              {`${item.year} - ${item.country}`}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
