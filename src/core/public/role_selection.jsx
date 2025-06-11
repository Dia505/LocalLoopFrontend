import { useState } from 'react';

import AppLogo1 from '../../components/app_logo_1';
import "../../components/role_selection_card";
import RoleSelectionCard from '../../components/role_selection_card';
import "../css_files/role_selection.css";

function RoleSelection() {
    const [activeCardId, setActiveCardId] = useState(null);

    const handleCardClick = (id) => {
        setActiveCardId(id);
    };

    return (
        <>
            <div className="main-window">
                <AppLogo1 />

                <div className='role-card-div'>
                    <RoleSelectionCard
                        cardImg={"src/assets/event_explorer_role.png"}
                        cardText={"I’m an event explorer, looking for events that match my vibe."}
                        isActive={activeCardId === 'event-explorer'} 
                        onClick={() => handleCardClick('event-explorer')}
                    />

                    <RoleSelectionCard
                        cardImg={"src/assets/event_organizer_role.png"}
                        cardText={"I’m an event organizer, hosting events and creating experiences"}
                        isActive={activeCardId === 'event-organizer'} 
                        onClick={() => handleCardClick('event-organizer')}
                    />
                </div>
            </div>
        </>
    )
}

export default RoleSelection;