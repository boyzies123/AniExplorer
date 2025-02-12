import { useEffect, useState } from "react"
import {Link} from "react-router-dom";
const TopAnime = () =>{

    const [topList, setTopList] = useState([]);

    useEffect (() =>{
        getTop();
    }, []); 
    const getTop = async (e) =>{
        const result = await fetch(`https://api.jikan.moe/v4/top/anime`);
        const response = await result.json();
        setTopList(response.data);
        console.log(response.data);

    }
    
    return (
        <div className="Top-container">
            <h1 id="top-header">Top 100 Anime</h1>
            {

                topList.map((anime, index) => (
                    <div className="List">
                        <div className="Ranking">
                            <p>{"#"}{index + 1}</p>
                        </div>
                        <Link to={'/AnimePage'} state={{ anime }}>
                        
                            
                            <img width="75" height="110" src={anime.images.jpg.image_url} alt={anime.title} />
                            
                            <div className="stats">
                                <div className="score">
                                    <p>{anime.score}</p>
                                </div>
                                <div className="member-count">
                                    <p>{anime.members}</p>
                                </div>
                                <div className="status">
                                    <p>{anime.status}</p>
                                </div>
                                <p>{anime.title}</p>
                            
                                <p>{anime.type}</p>
                            </div>
                        
                        
                        </Link>
                    </div>


                ))
            }
        </div>
        
        
    )
}
export default TopAnime;