import { Card, CardContent, Typography, Box } from "@mui/material";
import { holidayTypeIcons } from "../utils/holidayTypeIcons";

export default function HolidayCard({ holiday }) {
    const { localName, name, date, types } = holiday
    return (
        <Card>
            <CardContent>
                <Typography>{holiday.localName}</Typography>
                <Typography>
                    {holiday.name} — {holiday.date}
                </Typography>
                <Box>
                    {(types).map((type) => {
                        
                        const { icon, label } = holidayTypeIcons[type];
                        
                        return (
                            <Box key={type}>
                                {icon}
                                <Typography variant="caption">{label}</Typography>
                            </Box>

                        );

                    })}
                </Box>
            </CardContent>
        </Card>
    );
}
