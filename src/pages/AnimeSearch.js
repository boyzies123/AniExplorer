import { useLocation } from "react-router-dom";

const AnimeSearch = () =>{
    const location = useLocation();
    const {animeList, searchTerm} = location.state || {};

    return(
        <div className="bg">
            <ul>
                {
                    animeList.map((anime) => (
                        <div className="search">
                            <img width="100" src={anime.images.jpg.image_url}></img>
                            {anime.title}
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}
export default AnimeSearch;