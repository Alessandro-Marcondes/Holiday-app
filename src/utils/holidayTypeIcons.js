import PublicIcon from "@mui/icons-material/Groups";
import BankIcon from "@mui/icons-material/AccountBalance";
import SchoolIcon from "@mui/icons-material/School";
import OptionalIcon from "@mui/icons-material/CheckCircleOutline";
import OtherIcon from "@mui/icons-material/Category";


export const holidayTypeIcons = {
    Public: {
        icon: <PublicIcon color="primary" />,
        label: "Público",
      },
      Bank: {
        icon: <BankIcon color="secondary" />,
        label: "Bancário",
      },
      sSchool: {
        icon: <SchoolIcon color="error" />,
        label: "Escolar",
      },
      Optional: {
        icon: <OptionalIcon color="success" />,
        label: "Opcional",
      },
      Default: {
        icon: <OtherIcon color="disabled" />,
        label: "Outro",
      }
}