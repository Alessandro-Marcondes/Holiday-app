import { HolidayProvider } from "./contexts/HolidayContext";
import SearchForm from "./components/SearchForm";
import HolidayList from "./components/HolidayList";
import './App.css';


export default function App() {
  return (
    <HolidayProvider>
      <SearchForm />
      <div class="content">
        <HolidayList />
      </div>
    </HolidayProvider>
  );
}
