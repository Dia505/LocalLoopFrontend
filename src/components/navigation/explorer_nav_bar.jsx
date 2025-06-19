import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import notification from "../../assets/notification_icon.png"
import { useAuth } from "../../context/auth_context";

import "../css_files/navigation/explorer_nav_bar.css";
import ExplorerMenuWindow from "./explorer_menu_window";

function ExplorerNavBar() {
    const { authToken } = useAuth();

    const isLoggedIn = !!authToken;

    const location = useLocation();

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [isMenuWindowOpen, setIsMenuWindowOpen] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (!authToken) return;

                const decoded = jwtDecode(authToken);
                const userId = decoded._id || decoded.id;

                const response = await axios.get(
                    `http://localhost:3000/api/event-explorer/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [authToken]);

    return (
        <>
            <div className="nav-bar-main-div">
                <img className='logo' src={logo} />

                <div className="nav-bar-buttons">
                    <Link to="/">
                        <p className={location.pathname === "/" ? "active-link" : ""}>Home</p>
                    </Link>
                    <Link to="/search">
                        <p className={location.pathname === "/search" ? "active-link" : ""}>Explore</p>
                    </Link>
                    <p>Gallery</p>
                    <Link to="/contact">
                        <p className={location.pathname === "/contact" ? "active-link" : ""}>Contact</p>
                    </Link>
                </div>

                <div className="nav-bar-auth-buttons">
                    {isLoggedIn ? (
                        <div className="notif-profile-div">
                            <img className="notification" src={notification} />
                            <img className="profile" src={
                                user?.profilePicture
                                    ? user.profilePicture
                                    : "http://localhost:3000/event-explorer-images/default_profile_img.png"
                            } 
                            onClick={() => {setIsMenuWindowOpen((prev) => !prev)}}
                            />
                        </div>
                    ) : (
                        <div className="login-signup-div">
                            <button onClick={() => navigate("/login")} className="nav-bar-login-btn">Log In</button>
                            <button onClick={() => navigate("/role-selection")} className="nav-bar-signup-btn">Sign Up</button>
                        </div>
                    )}
                </div>

                {isMenuWindowOpen && (
                    <div className="explorer-menu-window">
                        <ExplorerMenuWindow
                            userProfilePicture={user?.profilePicture}
                            userFullName={user?.fullName}
                            isMenuWindowOpen={isMenuWindowOpen}
                            setIsMenuWindowOpen={setIsMenuWindowOpen}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default ExplorerNavBar;