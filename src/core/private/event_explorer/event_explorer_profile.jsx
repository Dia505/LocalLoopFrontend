import ExplorerNavBar from "../../../components/navigation/explorer_nav_bar";
import ExplorerSideBar from "../../../components/navigation/explorer_side_bar";
import "../../css_files/private/event_explorer_profile.css";

function EventExplorerProfile() {
    return (
        <>
            <div className="explorer-profile-main-window">
                <ExplorerNavBar />
                <div className="explorer-profile-centre">
                    <ExplorerSideBar />

                    <div className="explorer-profile-div">
                        <div className="explorer-profile-title-btn-div">
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventExplorerProfile;