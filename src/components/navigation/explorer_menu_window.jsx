import { useAuth } from "../../context/auth_context";
import { useNavigate } from "react-router-dom";

import bookings from "../../assets/bookings.png";
import bookmark from "../../assets/bookmark.png";
import profile from "../../assets/profile.png";
import ticket from "../../assets/ticket.png";
import logoutIcon from "../../assets/logout.png";
import "../css_files/navigation/explorer_menu_window.css";

function ExplorerMenuWindow({ userProfilePicture, userFullName, isMenuWindowOpen, setIsMenuWindowOpen }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <div className="explorer-menu-window-div">
                <div className="explorer-main-window-user-details-div">
                    <img className="explorer-main-window-user-img" src={userProfilePicture} />
                    <p className="explorer-main-window-user-name">{userFullName}</p>
                </div>

                <div className="explorer-main-window-nav-btns-div">
                    <div className="explorer-main-window-btn-div" onClick={() => navigate("/event-explorer-profile")}>
                        <img className="explorer-main-window-icon" src={profile} />
                        <p className="explorer-main-window-btn">Profile</p>
                    </div>
                    <div className="explorer-main-window-btn-div">
                        <img className="explorer-main-window-icon" src={bookmark} />
                        <p className="explorer-main-window-btn">Bookmarks</p>
                    </div>
                    <div className="explorer-main-window-btn-div">
                        <img className="explorer-main-window-icon" src={ticket} />
                        <p className="explorer-main-window-btn">My Tickets</p>
                    </div>
                    <div className="explorer-main-window-btn-div" onClick={() => navigate("/my-bookings")}>
                        <img className="explorer-main-window-icon" src={bookings} />
                        <p className="explorer-main-window-btn">My Bookings</p>
                    </div>
                </div>

                <div className="explorer-main-window-logout-div">
                    <img className="explorer-main-window-icon" src={logoutIcon} />
                    <p className="explorer-main-window-logout-btn" onClick={handleLogout}>Log out</p>
                </div>
            </div>
        </>
    )
}

export default ExplorerMenuWindow;