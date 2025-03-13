import { useEffect, useState, useRef, useContext } from "react"
import {Link} from "react-router-dom";
import Searchbar from '../components/Searchbar';
import { ThemeContext } from '../components/ThemeContext';
const TopAnime = () =>{

    const [topList, setTopList] = useState([]);
    //Hook for page updates
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const { darkMode } = useContext(ThemeContext);
    useEffect (() =>{
        getTop(1);
    }, []); //Empty, effect runs after intial render
    useEffect (()=>{
        window.addEventListener('scroll', handleScroll);
        return () =>{window.removeEventListener('scroll', handleScroll)};
        
    }, []);
    //called when page changes
    useEffect(()=>{
        if(page > 1){
            getTop(page);
        }
    }, [page]);
    const getTop = async (currentPage) =>{
        try{
            setLoading(true);
            const result = await fetch(`https://api.jikan.moe/v4/top/anime?page=${currentPage}`);
            const response = await result.json();
            console.log(response);
            //no more data, so do not update
            if (response.data.length === 0) {
                setHasMore(false);
                return;
            }
            //first page so only render first chunk of data
            if (page == 1){
                setTopList(response.data);
            }
            else{
                setTopList(prevList => [...prevList, ...response.data]);
            }
            console.log(response.data);
            
        }
        catch(error){
            console.error("Error fetching anime:", error);
        }
        finally{
            setLoading(false);
        }

    }
    const handleScroll = () =>{
        if (loading){
            return;
        }
        const top = document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight;
        const visibleHeight = document.documentElement.clientHeight;
        if (top + visibleHeight >= totalHeight - 100){
         
            setPage(page => page + 1);
        }
    }

    return (
       
        <div className={`Top-container ${darkMode ? 'dark-mode' : ''}`}>
            
            <h1 className={`top-header ${darkMode ? 'dark-mode' : ''}`}>Top 100 Anime</h1>
            <Searchbar style={{padding:'14px', left:'50px', position:'relative'}}/>
            {topList.map((anime, index) => (
            <div className="list-container" key={anime.mal_id}> 
                <div className={`Ranking ${darkMode ? 'dark-mode' : ''}`}>
                    <p>{"#"}{index + 1}</p>
                </div>
                <Link to={'/AnimePage'} state={{ anime }} className="list-link">
                    <div className={`List ${darkMode ? 'dark-mode' : ''}`}>
                        <img width="75" height="110" src={anime.images.jpg.image_url} alt={anime.title} />
                        <div className={`stats ${darkMode ? 'dark-mode' : ''}`}>
                            <div className="title">
                                <p>{anime.title}</p>
                            </div>
                            <div className="score">
                                <p>{anime.score}</p>
                            </div>
                            <div className="type">
                                <p>{anime.type}</p>
                            </div>
                            
                            <div className="season">
                                <p>{anime.season == null ? "N/A" : anime.season} {anime.year == null ? "N/A" : anime.year}</p>
                            </div>
                            
                            <div className="categories">
                            {
                                    anime.genres.map((genre) =>(
                                       
                                        <span className={`category-tag ${genre.name.toLowerCase().includes(' ') ? genre.name.toLowerCase().replace(/\s+/g, '-') : genre.name.toLowerCase()}`}>{genre.name}</span>
                                        
                                    ))
                                }
                            </div>
                            <div className="member-count">
                                <p>{anime.members + " members"}</p>
                            </div>
                            
                            
                            <div className="episode-count">
                                {anime.type == "TV Special" && <p>{anime.episodes + " episode"}</p>}
                                {anime.type == "Movie" && <p>{anime.duration + "s"}</p>}
                                {anime.type == "TV" && <p>{anime.episodes + " episodes"}</p>}
                                {anime.type == "OVA" && <p>{anime.episodes + " episodes"}</p>}
                            </div>
                            <div className="status">
                                <p>{anime.status}</p>
                            </div>
                            
                            
                        </div>
                        <div className="info">
                            
                        </div>
                    </div>
                </Link>
            </div>
        ))}
        {loading && <div className="loading">Loading more anime...</div>}
    </div>
        
    )
}
export default TopAnime;