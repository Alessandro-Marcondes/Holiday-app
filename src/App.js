import { HolidayProvider } from "./contexts/HolidayContext";
import SearchForm from "./components/SearchForm";
import HolidayList from "./components/HolidayList";


export default function App() {
  return (
    <HolidayProvider>
        <SearchForm />
        <HolidayList/>
    </HolidayProvider>
  );
}
