import { useNavigate } from "react-router-dom";

import "../css_files/home/home_location.css"

function HomeLocation({ location }) {
    const navigate = useNavigate();

    const handleLocationClick = () => {
        navigate(`/search?location=${encodeURIComponent(location)}`);
    };

    return (
        <div className="home-location-sparkle-div" onClick={handleLocationClick}>
            <p>{location}</p>
            <div className="sparkle-wrapper">
                <img className="home-sparkle" src="src\assets\giphy.gif" />
            </div>
        </div>
    );
}

export default HomeLocation;
