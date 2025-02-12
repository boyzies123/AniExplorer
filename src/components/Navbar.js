import {Link } from "react-router-dom";
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
                <Link to={'/Login'} >Login</Link>
                <Link to={"/CreateAccount"}>Sign Up</Link>
            </div>
        </div>
    );
    
};
export default Navbar;