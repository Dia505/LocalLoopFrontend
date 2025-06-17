import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth_context";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

import "./css_files/explorer_nav_bar.css";

function ExplorerNavBar() {
    const { authToken, logout } = useAuth();

    const isLoggedIn = !!authToken;

    const location = useLocation();

    const navigate = useNavigate();

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
                    <p>Contact</p>
                </div>

                <div className="nav-bar-auth-buttons">
                    {isLoggedIn ? (
                        <div className="notif-profile-div">
                            <img className="notification" src="src\assets\notification_icon.png" />
                            <div className="profile"></div>
                        </div>
                    ) : (
                        <div className="login-signup-div">
                            <button onClick={() => navigate("/login")} className="nav-bar-login-btn">Log In</button>
                            <button onClick={() => navigate("/role-selection")} className="nav-bar-signup-btn">Sign Up</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ExplorerNavBar;