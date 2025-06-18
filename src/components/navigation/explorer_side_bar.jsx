import { useNavigate } from "react-router-dom";

import bookings from "../../assets/bookings.png";
import bookmark from "../../assets/bookmark.png";
import profile from "../../assets/profile.png";
import ticket from "../../assets/ticket.png";
import "../css_files/navigation/explorer_side_bar.css";

function ExplorerSideBar() {
    const navigate = useNavigate();
    
    return (
        <>
            <div className="explorer-side-bar-main-window">
                <div className="explorer-side-bar-btn-div" onClick={() => navigate("/event-explorer-profile")}>
                    <img className="explorer-side-bar-icon" src={profile} />
                    <p className="explorer-side-bar-btn">Profile</p>
                </div>
                <div className="explorer-side-bar-btn-div">
                    <img className="explorer-side-bar-icon" src={bookmark} />
                    <p className="explorer-side-bar-btn">Bookmarks</p>
                </div>
                <div className="explorer-side-bar-btn-div">
                    <img className="explorer-side-bar-icon" src={ticket} />
                    <p className="explorer-side-bar-btn">My Tickets</p>
                </div>
                <div className="explorer-side-bar-btn-div">
                    <img className="explorer-side-bar-icon" src={bookings} />
                    <p className="explorer-side-bar-btn">My Bookings</p>
                </div>
            </div>
        </>
    )
}

export default ExplorerSideBar;