import {Link } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import ToggleButton from "./ToggleButton";
const Navbar = () => {
    return (
        <div className="topnav">
            <div className="left">
                <Link to={'/Home'} >Home</Link>
                <Link to={'/TopAnime'}>Top Anime</Link>
                <a href="#Top Manga">Top Manga</a>
                <a href="#Top Characters">Top Characters</a>
                
            </div>
            
            <div className="right">
                <div><ToggleButton/></div>
                <Link to={'/Login'} >Login</Link>
                <Link to={"/CreateAccount"}>Sign Up</Link>
                <div><Searchbar/></div>
                
            </div>
            
        </div>
    );
    
};
export default Navbar;