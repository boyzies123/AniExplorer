import {Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div class="topnav">
            <div class="left">
                <Link to={'/Home'} >Home</Link>
                <a href="#Top Anime">Top Anime</a>
                <a href="#Top Manga">Top Manga</a>
                <a href="#Top Characters">Top Characters</a>
                
            </div>

            <div class="right">
                <Link to={'/Login'} >Login</Link>
                <a href="#Signup">Sign Up</a>
            </div>
        </div>
    );
    
};
export default Navbar;