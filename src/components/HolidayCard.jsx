import { Card, CardContent, Typography } from "@mui/material";

export default function HolidayCard({ holiday }) {
  return (
    <Card>
      <CardContent>
        <Typography>{holiday.localName}</Typography>
        <Typography>
          {holiday.name} — {holiday.date}
        </Typography>
        <Typography >
          Tipo: {holiday.types?.join(", ") || "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
}
