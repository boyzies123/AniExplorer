import { useLocation } from "react-router-dom";
const AnimePage = () =>{
    const location = useLocation();
    const {anime} = location.state || {};
    return(
        <div className="test">
            
        </div>
    )
}
export default AnimePage;