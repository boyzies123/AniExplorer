import { useLocation } from "react-router-dom";
const AnimePage = () =>{
    const location = useLocation();
    {console.log(location.state + "test")}
    const {anime} = location.state || {};
    return(
        <div className="test">
            <p>{anime.title}</p>
        </div>
    )
}
export default AnimePage;