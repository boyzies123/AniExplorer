import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Searchbar from './components/Searchbar';
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import AnimeSearch from './pages/AnimeSearch';
import AnimePage from './pages/AnimePage';
import TopAnime from './pages/TopAnime';
function App() {
  return (
    <Router>
      <Navbar />
      <Searchbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/AnimeSearch" element={<AnimeSearch />} />
        <Route path="/AnimePage" element={<AnimePage />} />
        <Route path="/TopAnime" element={<TopAnime />} />
      </Routes>
    </Router>
    
  );
}

export default App;
