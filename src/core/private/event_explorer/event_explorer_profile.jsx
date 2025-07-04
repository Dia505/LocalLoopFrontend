import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth_context";

import edit from "../../../assets/edit.png";
import ExplorerEditProfileForm from "../../../components/event_explorer/explorer_edit_profile_form";
import Footer from "../../../components/footer";
import ExplorerNavBar from "../../../components/navigation/explorer_nav_bar";
import ExplorerSideBar from "../../../components/navigation/explorer_side_bar";
import "../../css_files/private/event_explorer_profile.css";

function EventExplorerProfile() {
    const { authToken } = useAuth();
    const [user, setUser] = useState(null);
    const [showEditProfileForm, setShowEditProfileForm] = useState(false);

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
            <div className="explorer-profile-main-window">
                <ExplorerNavBar />
                <div className="explorer-profile-centre">
                    <ExplorerSideBar />

                    {showEditProfileForm ? (
                        <ExplorerEditProfileForm closeForm={() => setShowEditProfileForm(false)} />
                    ) : (
                        <div className="explorer-profile-div">
                            <div className="explorer-profile-title-btn-div">
                                <p className="explorer-profile-title">Profile</p>
                                <img className="explorer-profile-edit-btn" src={edit} onClick={() => setShowEditProfileForm(true)} />
                            </div>

                            <div className="explorer-profile-img-details-div">
                                <img className="explorer-profile-img" src={user?.profilePicture} />

                                <div className="explorer-profile-details-div">
                                    <div className="explorer-profile-name-number-div">
                                        <div className="explorer-profile-detail-div">
                                            <p className="explorer-profile-detail-title">Name</p>
                                            <p>{user?.fullName}</p>
                                        </div>

                                        <div className="explorer-profile-detail-div">
                                            <p className="explorer-profile-detail-title">Mobile number</p>
                                            <p>{user?.mobileNumber}</p>
                                        </div>
                                    </div>

                                    <div className="explorer-profile-address-city-div">
                                        <div className="explorer-profile-detail-div">
                                            <p className="explorer-profile-detail-title">Address</p>
                                            <p>{user?.address}</p>
                                        </div>

                                        <div className="explorer-profile-detail-div">
                                            <p className="explorer-profile-detail-title">City</p>
                                            <p>{user?.city}</p>
                                        </div>
                                    </div>

                                    <div className="explorer-profile-detail-div">
                                        <p className="explorer-profile-detail-title">Email address</p>
                                        <p>{user?.email}</p>
                                    </div>

                                    <div className="explorer-profile-detail-div">
                                        <p className="explorer-profile-detail-title">Password</p>
                                        <p>{user?.password ? "•".repeat(user?.password.length) : ""}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default EventExplorerProfile;