import { useState, useEffect, use } from "react";
import { useLocation } from "react-router-dom";
import ScreenWidth from "../components/ScreenWidth";
const AnimePage = () => {
    const location = useLocation();
    const { anime } = location.state || {};
    const [bannerImage, setBannerImage] = useState(null);
    const [error, setError] = useState(null);
    //Destructure width and height
    const {width, height} = ScreenWidth();

    const [characterList, setCharacterList] = useState([]);
    const [staffList , setStaffList] = useState([]);
    useEffect(() => {
        getCharacters();
        getStaff();
    }, [])
    useEffect(() => {
        const fetchBannerImage = async () => {
            try {
                // Query modified to search more precisely using multiple title fields
                const query = `
                    query ($search: String) {
                        Media(search: $search, type: ANIME) {
                            id
                            bannerImage
                            title {
                                romaji
                                english
                                native
                            }
                            startDate {
                                year
                            }
                            format
                            episodes
                        }
                    }
                `;

                // Clean the title to improve search accuracy
                console.log("Old title" + anime.title);
                const cleanTitle = anime.title.replace(/\([^)]*\)|\[[^\]]*\]/, '').trim();
                console.log("new title" + cleanTitle);
                const variables = {
                    search: cleanTitle
                };

                const response = await fetch("https://graphql.anilist.co", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({
                        query,
                        variables
                    }),
                });

                const data = await response.json();
                
                if (data.errors || !data.data?.Media?.bannerImage) {
                    setBannerImage("/images/im.png");
                    setError(null);
                }

                else{
                    setBannerImage(data.data.Media.bannerImage);
                    setError(null);
                }
                // Log for debugging
                console.log("Jikan Anime:", {
                    title: anime.title,
                    year: anime.year,
                    episodes: anime.episodes
                });
                console.log("AniList Match:", data.data.Media);
                
                
            } catch (err) {
                console.error("Error fetching banner image:", err);
                setError(err.message);
            }
        };

        if (anime?.title) {
            fetchBannerImage();
        }
    }, [anime]);
    const getCharacters = async() =>{
        try{
            const result = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/characters`);
            const characterResponse = await result.json();
            console.log(characterResponse.data);
            setCharacterList(characterResponse.data);
        }
        catch(error){
            console.error("Error fetching characters");
        }
       
    }

    const getStaff = async() =>{
        try{
            const result = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/staff`);
            const staffResponse = await result.json();
            console.log(staffResponse.data);
            setStaffList(staffResponse.data);
            
        }
        catch(error){
            console.error("Error fetching staff");
        }
    }   
    return (
        <div className="anime-page">
            <div className="header-image">
                {error && <p className="text-red-500">Error loading banner: {error}</p>}
                {bannerImage && (
                    <img 
                        src={bannerImage} 
                        alt={`${anime.title} banner`}
                        width={width}
                        className="w-full h-48 object-cover"
                    />
                )}
            </div>
            <div className="content-wrapper">
                <div className="anime-image">
                    <img src={anime.images.jpg.image_url}></img>
                </div>
                <div className="anime-info">
                    <h1>{anime.title}</h1>
                    <p>{anime.synopsis}</p>
                </div>

                <div className="anime-page-info">
                    <h3>Score</h3>
                    <p>{anime.score}</p>
                    <h3>Format</h3>
                    <p>{anime.type}</p>
                    <h3>Episodes</h3>
                    <p>{anime.episodes}</p>
                    <h3>Duration</h3>
                    <p>{anime.duration}</p>
                    <h3>Status</h3>
                    <p>{anime.status}</p>
                    <h3>{anime.aired.to == null ? "Release date" : "Start date"}</h3>
                    <p>{anime.aired.from.substring(0, 10)}</p>
                    <h3>{anime.aired.to == null ? "" : "End date"}</h3>
                    <p>{anime.aired.to == null ? "" : anime.aired.to.substring(0, 10)}</p>
                    <h3>Season</h3>
                    <p>{String(anime.season).charAt(0).toUpperCase() + String(anime.season).slice(1)} { anime.aired.from.substring(0, 4)}</p>
                    <h3>Popularity</h3>
                    <p>{anime.members}</p>
                    <h3>Favorites</h3>
                    <p>{anime.favorites}</p>
                    <h3>Studio</h3>
                    <p>{anime.studios[0].name}</p>
                </div>
                <div className="character-grid">
                    <h2>Characters</h2>
                    <div className="character-card">
                    {characterList
                        .sort((a, b) => b.favorites - a.favorites)
                        .slice(0, 8)
                        .map((character) => (
                        <div className="character-container" key={character.id || Math.random()}>
                            <div className="character-info">
                            <p>{character.character.name}</p>
                            <p>{character.role}</p>
                            <img 
                                src={character.character.images.jpg.image_url} 
                                width="100" 
                                height="150" 
                               
                            />
                            </div>
                            
                            {character.voice_actors
                            .filter((va) => va.language === "Japanese")
                            .slice(0, 1)
                            .map((voiceActor) => (
                                <div className="voice-actor" key={voiceActor.person.id || Math.random()}>
                                <p>{voiceActor.person.name}</p>
                                <p>{voiceActor.language}</p>
                                <img
                                    src={voiceActor.person.images.jpg.image_url}
                                    width="100" 
                                    height="150" 
                                    
                                />
                                </div>
                            ))}
                        </div>
                        ))}
                    </div>
                </div>
                <h2 id="staff-header">Staff</h2>
                <div className="staff-grid">
                    
                    {staffList
                    .filter(staff => staff.positions.includes("Original Creator") || staff.positions.includes("Original Character Design") || 
                        staff.positions.includes("Director") || staff.positions.includes("Series Composition") )
                    .map((staff) =>(
                        <div className="staff-container">
                            <div className="staff">
                            <p>{staff.person.name}</p>
                            <p>{staff.positions.slice(0, 1)}</p>
                                <img 
                                src={staff.person.images.jpg.image_url} 
                                width="100" 
                                height="150" 
                               
                                />
                            </div>
                        </div>
                    ))


                    }
                </div>
            </div>
            
        </div>
    );
};

export default AnimePage;