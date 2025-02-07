import { useLocation } from "react-router-dom";
import {Link} from "react-router-dom";
const AnimeSearch = () =>{
    const location = useLocation();
    const {animeList, searchTerm} = location.state || {};

    return(
        <div className="image-container">
    
                {
                    animeList.map((anime) => (
                        <div className="image-card">
                            <Link to={'/AnimePage'} state={anime}>
                                <img width="150" height="220" src={anime.images.jpg.image_url}></img>
                            
                                
                            </Link>
                            <p>{anime.title}</p>
                            <div className="popup">
                                <p>Anime Rank: {anime.rank}</p>
                                <p>Anime Score: {anime.score}</p>
                                <p>{anime.type + " " + anime.episodes + " episodes"}</p>
                                <p>{anime.season + " " + anime.year}</p>
                            </div>
                        </div>
                        
                    ))
                }

        </div>
    )
}
export default AnimeSearch;