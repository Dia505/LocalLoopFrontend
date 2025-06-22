import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth_context";
import { useNavigate } from "react-router-dom";

import dashboard from "../../assets/dashboard.png";
import logo from "../../assets/logo.png";
import logoutIcon from "../../assets/logout.png";
import events from "../../assets/my_events.png";
import profile from "../../assets/profile.png";
import "../css_files/navigation/organizer_side_bar.css";

function OrganizerSideBar() {
    const location = useLocation();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <div className="organizer-side-bar-main-div">
                <img className='logo' src={logo} />

                <div className="organizer-side-bar-nav-btns-div">
                    <p className="main-menu-text">Main menu</p>
                    <div className="organizer-side-bar-divider"></div>

                    <Link to="/dashboard">
                        <div className={location.pathname === "/dashboard" ? "organizer-side-bar-selected-btn" : "organizer-side-bar-btn-div"}>
                            <img className="organizer-side-bar-icon" src={dashboard} />
                            <p>Dashboard</p>
                        </div>
                    </Link>

                    <div className="organizer-side-bar-btn-div">
                        <img className="organizer-side-bar-icon" src={events} />
                        <p>My Events</p>
                    </div>

                    <div className="organizer-side-bar-btn-div">
                        <img className="organizer-side-bar-icon" src={profile} />
                        <p>Profile</p>
                    </div>
                </div>

                <div className="organizer-side-bar-logout-div">
                    <img className="organizer-side-bar-icon" src={logoutIcon} />
                    <p className="organizer-side-bar-logout-btn" onClick={handleLogout}>Log out</p>
                </div>
            </div>
        </>
    )
}

export default OrganizerSideBar;