import { Link, useLocation } from "react-router-dom";

import bookings from "../../assets/bookings.png";
import bookmark from "../../assets/bookmark.png";
import profile from "../../assets/profile.png";
import ticket from "../../assets/ticket.png";
import "../css_files/navigation/explorer_side_bar.css";

function ExplorerSideBar() {
    const location = useLocation();

    return (
        <>
            <div className="explorer-side-bar-main-window">
                <Link to="/event-explorer-profile">
                    <div className={location.pathname === "/event-explorer-profile" ? "active-explorer-side-bar-btn" : "explorer-side-bar-btn-div"}>
                        <img className="explorer-side-bar-icon" src={profile} />
                        <p className="explorer-side-bar-btn">Profile</p>
                    </div>
                </Link>

                <Link to="/bookmarks">
                    <div className={location.pathname === "/bookmarks" ? "active-explorer-side-bar-btn" : "explorer-side-bar-btn-div"}>
                        <img className="explorer-side-bar-icon" src={bookmark} />
                        <p className="explorer-side-bar-btn">Bookmarks</p>
                    </div>
                </Link>

                <Link to="/my-tickets">
                    <div className={location.pathname === "/my-tickets" ? "active-explorer-side-bar-btn" : "explorer-side-bar-btn-div"}>
                        <img className="explorer-side-bar-icon" src={ticket} />
                        <p className="explorer-side-bar-btn">My Tickets</p>
                    </div>
                </Link>

                <Link to="/my-bookings">
                    <div className={location.pathname === "/my-bookings" ? "active-explorer-side-bar-btn" : "explorer-side-bar-btn-div"}>
                        <img className="explorer-side-bar-icon" src={bookings} />
                        <p className="explorer-side-bar-btn">My Bookings</p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default ExplorerSideBar;