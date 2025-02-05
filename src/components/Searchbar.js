import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Searchbar = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    const [animeList, setAnimeList] = useState([]);
    const navigate= useNavigate();
    useEffect (() =>{
        
    }, []); 
    const handleSearch = async (e) => {
        //Prevent refresh as submission results in reload
        e.preventDefault();
        if (!searchTerm){
            return;
        }

        console.log(searchTerm);
        const result = await fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=10`);
        const response = await result.json();
        setAnimeList(response.data);
        console.log(response.data);
        navigate("/AnimeSearch", {
            state: {animeList, searchTerm}
        });

    }
    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input className="bar" type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for Anime, Manga, and more"/>
            </form>
        </div>
    )
}
export default Searchbar;