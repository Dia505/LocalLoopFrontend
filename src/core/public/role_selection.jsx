import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import AppLogo1 from '../../components/app_logo_1';
import "../css_files/public/role_selection.css";

function RoleSelection() {
    const [activeCardId, setActiveCardId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleCardClick = (id) => {
        setActiveCardId(id);
    };

    useEffect(() => {
        if (location.state?.selectedRole) {
            setActiveCardId(location.state.selectedRole);
        }
    }, [location.state]);

    return (
        <>
            <div className="main-window">
                <AppLogo1 />

                <div className='role-card-div'>
                    <div
                        className={`explorer-card-div ${activeCardId === 'event-explorer' ? 'active-gradient-border' : ''}`}
                        onClick={() => handleCardClick('event-explorer')}
                    >
                        <img src={"src/assets/event_explorer_role.png"} className="card-img" />
                        <div className="card-text-div">
                            <p className="card-text">I’m an event explorer, looking for events that match my vibe</p>
                        </div>
                    </div>

                    <div
                        className={`organizer-card-div ${activeCardId === 'event-organizer' ? 'active-gradient-border' : ''}`}
                        onClick={() => handleCardClick('event-organizer')}
                    >
                        <img src={"src/assets/event_organizer_role.png"} className="card-img" />
                        <div className="card-text-div">
                            <p className="card-text">I’m an event organizer, hosting events and creating experiences</p>
                        </div>
                    </div>
                </div>

                <div className='button-login-div'>
                    <button
                        className={`join-btn ${activeCardId
                            ? "active-btn"
                            : "disabled-btn"
                            }`}
                        disabled={!activeCardId}
                        onClick={() => {
                            if (activeCardId === "event-explorer") {
                                navigate("/event-explorer-registration", {
                                    state: { selectedRole: activeCardId }
                                });
                            } else if (activeCardId === "event-organizer") {
                                navigate("/event-organizer-registration", {
                                    state: { selectedRole: activeCardId }
                                });
                            }
                        }}
                    >
                        {activeCardId
                            ? `Join as ${activeCardId.replace("-", " ")}`
                            : "Who are you joining as?"}
                    </button>

                    <div className='login-div'>
                        <p className='already-have-account-text'>Already have an account?</p>
                        <p className='login-text' onClick={() => navigate("/login")}>Log In</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoleSelection;