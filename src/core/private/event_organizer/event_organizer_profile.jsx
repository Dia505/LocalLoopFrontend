import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth_context";

import editIcon from "../../../assets/edit.png";
import OrganizerEditProfileForm from "../../../components/event_organizer/organizer_edit_profile_form";
import OrganizerSideBar from "../../../components/navigation/organizer_side_bar";
import OrganizerFooter from "../../../components/organizer_footer";
import "../../css_files/private/event_organizer_profile.css";

function EventOrganizerProfile() {
    const { authToken } = useAuth();
    const [organizer, setOrganizer] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        const fetchOrganizerDetails = async () => {
            try {
                if (!authToken) return;

                const decoded = jwtDecode(authToken);
                const organizerId = decoded._id || decoded.id;

                const response = await axios.get(
                    `http://localhost:3000/api/event-organizer/${organizerId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                setOrganizer(response.data);
            } catch (error) {
                console.error("Error fetching organizer details:", error);
            }
        };

        fetchOrganizerDetails();
    }, [authToken]);

    return (
        <>
            <div className="organizer-profile-main-window">
                <div className="organizer-profile-side-bar">
                    <OrganizerSideBar />
                </div>

                <div className="organizer-profile-main-div">
                    {showEditForm ? (
                        <OrganizerEditProfileForm closeForm={() => setShowEditForm(false)} />
                    ) : (
                        <div className="organizer-profile-top-section">
                            <img className="organizer-profile-img" src={organizer?.profilePicture} />

                            <div className="organizer-profile-details-div">
                                <div className="organizer-profile-details-section">
                                    <div className="personal-details-edit-div">
                                        <p className="organizer-profile-title">Personal details</p>
                                        <img className="organizer-profile-edit-btn2" src={editIcon} onClick={() => setShowEditForm(true)} />
                                    </div>

                                    <div className="organizer-profile-detail">
                                        <p className="organizer-profile-detail-title">Full name</p>
                                        <p className="organizer-profile-detail-value">{organizer?.fullName}</p>
                                    </div>

                                    <div className="organizer-profile-detail">
                                        <p className="organizer-profile-detail-title">Mobile number</p>
                                        <p className="organizer-profile-detail-value">{organizer?.mobileNumber}</p>
                                    </div>

                                    <div className="organizer-profile-detail">
                                        <p className="organizer-profile-detail-title">Email address</p>
                                        <p className="organizer-profile-detail-value">{organizer?.email}</p>
                                    </div>

                                    <div className="organizer-profile-detail">
                                        <p className="organizer-profile-detail-title">Password</p>
                                        <p className="organizer-profile-detail-value">{organizer?.password ? "•".repeat(organizer?.password.length) : ""}</p>
                                    </div>
                                </div>

                                <div className="organizer-profile-divider"></div>

                                <div className="organizer-profile-details-section">
                                    <p className="organizer-profile-title">Company details</p>

                                    <div className="organizer-profile-detail">
                                        <p className="organizer-profile-detail-title">Company name</p>
                                        <p className="organizer-profile-detail-value">{organizer?.companyName}</p>
                                    </div>

                                    <div className="organizer-profile-detail">
                                        <p className="organizer-profile-detail-title">Business type</p>
                                        <p className="organizer-profile-detail-value">{organizer?.businessType}</p>
                                    </div>

                                    <div className="organizer-profile-detail">
                                        <p className="organizer-profile-detail-title">PAN/VAT number</p>
                                        <p className="organizer-profile-detail-value">{organizer?.panNumber}</p>
                                    </div>

                                    <div className="organizer-profile-address-city-div">
                                        <div className="organizer-profile-detail">
                                            <p className="organizer-profile-detail-title">Address</p>
                                            <p className="organizer-profile-detail-value">{organizer?.address}</p>
                                        </div>

                                        <div className="organizer-profile-detail">
                                            <p className="organizer-profile-detail-title">City</p>
                                            <p className="organizer-profile-detail-value">{organizer?.city}</p>
                                        </div>
                                    </div>

                                    <div className="organizer-profile-detail">
                                        <p className="organizer-profile-detail-title">Contact number</p>
                                        <p className="organizer-profile-detail-value">{organizer?.contactNumber}</p>
                                    </div>

                                    <div className="organizer-profile-detail">
                                        <p className="organizer-profile-detail-title">Company email</p>
                                        <p className="organizer-profile-detail-value">{organizer?.companyEmail}</p>
                                    </div>

                                    <div className="organizer-profile-detail">
                                        <p className="organizer-profile-detail-title">Social media links</p>
                                        <div className="organizer-profile-social-link-div">
                                            {organizer?.socialMediaLinks?.map((link, index) => {
                                                let domain;
                                                try {
                                                    domain = new URL(link).hostname.replace("www.", "");
                                                } catch {
                                                    domain = link; // fallback in case of invalid URL
                                                }

                                                return (
                                                    <div className="organizer-profile-social-link">
                                                        <a
                                                            key={index}
                                                            href={link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="organizer-social-link"
                                                        >
                                                            {domain}
                                                        </a>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <img className="organizer-profile-edit-btn" src={editIcon} onClick={() => setShowEditForm(true)} />
                            </div>
                        </div>
                    )}

                    <OrganizerFooter />
                </div>
            </div>
        </>
    )
}

export default EventOrganizerProfile;