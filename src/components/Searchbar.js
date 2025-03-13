import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../components/ThemeContext';
const Searchbar = ({ style }) =>{
    const [searchTerm, setSearchTerm] = useState("");
    const [animeList, setAnimeList] = useState([]);
    const navigate= useNavigate();
    const { darkMode } = useContext(ThemeContext);
    useEffect (() =>{
        if (animeList.length > 0){
            setSearchTerm("");
            navigate("/AnimeSearch", {
                state: {animeList}
            });
        }
    }, [animeList]); 
    const handleSearch = async (e) => {
        //Prevent refresh as submission results in reload
        e.preventDefault();
        if (!searchTerm){
            console.log("test");
            return;
        }

        console.log(searchTerm);
        const result = await fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=10`);
        const response = await result.json();
        setAnimeList(response.data);
        console.log(response.data);
        

    }
    return (
        <div className= {`search-bars ${darkMode ? 'dark-mode' : ''}`} style={{...style}}>
            <form onSubmit={handleSearch}>
                <span className={`material-symbols-outlined ${darkMode ? 'dark-mode' : ''}`}>search</span>
                <input className={`bar ${darkMode ? 'dark-mode' : ''}`} type="search" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)}></input>
            </form>
        </div>
    )
}
export default Searchbar;