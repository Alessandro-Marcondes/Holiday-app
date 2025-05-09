import { useContext, useState } from "react";
import { Box, Typography,IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { HolidayContext } from "../contexts/HolidayContext";

export default function SearchHistory() {
  const { state } = useContext(HolidayContext);
  const { searchHistory } = state;
  const [open, setOpen] = useState(false);

const toggleDrawer = (state) => () => {
    setOpen(state);
  };
 

  return (
    <Box>
      
      <IconButton color="inherit" onClick={toggleDrawer(true)} title="Histórico de busca">
        <HistoryIcon />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6">Histórico de Busca</Typography>
          {searchHistory.length === 0 ? (
            <Typography>Sem histórico de buscas.</Typography>
          ) : (
            <List>
              {searchHistory.map((item, index) => (
                <ListItem button key={index}>
                  <ListItemText primary={`${item.year} - ${item.country}`} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
