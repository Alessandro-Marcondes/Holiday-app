import { HolidayProvider } from "./contexts/HolidayContext";
import SearchForm from "./components/SearchForm";
import HolidayList from "./components/HolidayList";
import SearchHistory from "./components/SearchHistory";


export default function App() {
  return (
    <HolidayProvider>
        <SearchForm />
        <SearchHistory>
        </SearchHistory>
        <HolidayList/>
    </HolidayProvider>
  );
}
