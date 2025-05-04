import { HolidayProvider } from "./contexts/HolidayContext";
import SearchForm from "./components/SearchForm";


export default function App() {
  return (
    <HolidayProvider>
        <SearchForm />
    </HolidayProvider>
  );
}
