import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import facebook from "../../assets/facebook2.png";
import instagram from "../../assets/instagram.png";
import tiktok from "../../assets/tiktok.png";
import xIcon from "../../assets/X.png";
import Footer from "../../components/footer";
import ExplorerNavBar from "../../components/navigation/explorer_nav_bar";
import "../css_files/public/event_gallery.css";

function EventGallery() {
    const { _id } = useParams();
    const [eventGallery, setEventGallery] = useState(null);
    const navigate = useNavigate();
    const [photo, showPhoto] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);


    useEffect(() => {
        const fetchEventGallery = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/gallery/${_id}`);
                setEventGallery(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };
        fetchEventGallery();
    }, [_id]);

    return (
        <>
            <div className="event-gallery-main-window">
                <ExplorerNavBar />

                <div className="event-gallery-main-section">
                    <div className="event-gallery-top-section">
                        <div className="event-gallery-title-div">

                            <div className="event-gallery-title-back-btn-div" onClick={() => navigate("/gallery")}>
                                <span className="event-gallery-back-btn">&#8592;</span>
                                <p className="event-gallery-title">Event Gallery</p>
                            </div>

                            <p className="event-gallery-event-title">{eventGallery?.eventTitle}</p>
                        </div>

                        <div className="event-gallery-organizer-div">
                            <div className="event-gallery-organizer-img-name-div">
                                <img className="event-gallery-organizer-img" src={`http://localhost:3000/gallery-company-images/${eventGallery?.companyProfilePicture}`} />
                                <p className="event-gallery-organizer-name">{eventGallery?.companyName}</p>
                            </div>

                            <div className="event-gallery-organizer-social-media-div">
                                {eventGallery?.companySocialMediaLinks?.map((link, index) => {
                                    let icon = null;

                                    if (link.includes("facebook.com")) {
                                        icon = facebook;
                                    } else if (link.includes("instagram.com")) {
                                        icon = instagram;
                                    } else if (link.includes("tiktok.com")) {
                                        icon = tiktok;
                                    } else if (link.includes("x.com") || link.includes("twitter.com")) {
                                        icon = xIcon;
                                    }

                                    return icon ? (
                                        <a href={link} target="_blank" rel="noopener noreferrer" key={index}>
                                            <img src={icon} alt="social-icon" className="social-icon" />
                                        </a>
                                    ) : null;
                                })}
                            </div>

                        </div>
                    </div>

                    <div className="event-gallery-grid">
                        {eventGallery?.galleryPhotos?.map((photo, index) => (
                            <div key={index} className="event-gallery-photo-wrapper">
                                <img
                                    src={`http://localhost:3000/gallery-images/${photo}`}
                                    alt={`Gallery ${index}`}
                                    className="event-gallery-photo"
                                    onClick={() => showPhoto(photo)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <Footer />

                {photo && (
                    <>
                        <div className="event-gallery-overlay" onClick={() => showPhoto(false)}></div>
                        <div className="event-gallery-lightbox">
                            <img
                                src={`http://localhost:3000/gallery-images/${photo}`}
                                alt="Full View"
                                className="event-gallery-full-img"
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default EventGallery;