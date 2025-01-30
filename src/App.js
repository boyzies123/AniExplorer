import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Searchbar from './components/Searchbar';
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <Navbar />
      <Searchbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    
  );
}

export default App;
