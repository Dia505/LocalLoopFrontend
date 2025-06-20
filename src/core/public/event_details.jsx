import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth_context";

import facebook from "../../assets/facebook2.png";
import calendarIcon from "../../assets/grey_calendar.png";
import clockIcon from "../../assets/grey_clock.png";
import locationIcon from "../../assets/grey_location.png";
import ticketIcon from "../../assets/grey_ticket.png";
import instagram from "../../assets/instagram.png";
import noOrganizerEvents from "../../assets/no_organizer_events.png";
import tiktok from "../../assets/tiktok.png";
import SimilarEvents from "../../components/event/similar_events";
import Footer from "../../components/footer";
import ExplorerNavBar from "../../components/navigation/explorer_nav_bar";
import SearchResult from "../../components/search/search_result";

import BookSeatsForm from "../../components/event/book_seats_form";
import "../css_files/public/event_details.css";

function EventDetails() {
    const { _id } = useParams();
    const {authToken} = useAuth();
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [organizerEvents, setOrganizerEvents] = useState([]);
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [user, setUser] = useState(null);

    const [showBookingForm, setShowBookingForm] = useState(false);

    const handleVideoPlay = () => {
        videoRef.current.play();
        setIsPlaying(true);
    };

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/event/${_id}`);
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };
        fetchEventDetails();
    }, [_id]);

    useEffect(() => {
        if (event && event.isPaid) {
            const fetchTicketDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/ticket/event/${_id}`);
                    setTickets(response.data);
                } catch (error) {
                    console.error("Error fetching tickets:", error);
                }
            };
            fetchTicketDetails();
        }
    }, [_id, event]);

    useEffect(() => {
        if (event && event.eventOrganizerId) {
            const organizerId = event.eventOrganizerId._id;

            const fetchOrganizerEvents = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/event/event-organizer/${organizerId}`);
                    const otherEvents = response.data.filter(e => e._id !== event._id);

                    const shuffled = otherEvents.sort(() => 0.5 - Math.random());
                    const randomTwo = shuffled.slice(0, 2);

                    setOrganizerEvents(randomTwo);
                } catch (error) {
                    console.error("Error fetching organizer's events:", error);
                }
            };

            fetchOrganizerEvents();
        }
    }, [event]);

    useEffect(() => {
        if (showBookingForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showBookingForm]);

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

    if (!event) {
        return (
            <div className="event-details-main-window">
                <ExplorerNavBar />
                <p className="event-loading-msg">Loading event details...</p>
            </div>
        );
    }

    return (
        <div className="event-details-main-window">
            <ExplorerNavBar />

            <div className="event-details-main-div">
                <img
                    className="event-details-img"
                    src={`http://localhost:3000/event-images/${event.eventPhoto}`}
                    alt={event.title}
                />

                <div className="event-details-title-subtitle-buttons-div">
                    <div className="event-details-title-buttons-div">
                        <p className="event-details-title">{event.title}</p>

                        <div className="event-details-buttons-div">
                            {(event.isPaid || (!event.isPaid && event.totalSeats > 0)) && (
                                <button
                                    className="event-details-ticket-btn"
                                    onClick={() => {
                                        if (!event.isPaid) {
                                            if (authToken) {
                                                console.log(authToken);
                                                setShowBookingForm(true);
                                            } else {
                                                navigate("/login");
                                            }
                                        }
                                    }}
                                >
                                    {event.isPaid ? "Buy tickets" : "Book seats"}
                                </button>
                            )}

                            <span className="material-symbols-outlined">
                                bookmark
                            </span>
                        </div>
                    </div>

                    <div className="event-details-subtitle-div">
                        <p className="event-details-subtitle">{event.subtitle}</p>
                    </div>
                </div>

                <div className="event-details-time-date-location-div">
                    <div className="event-details-icon-detail-div">
                        <img className="event-details-icon" src={locationIcon} />
                        <p className="event-details-detail">{event.venue}, {event.city}</p>
                    </div>

                    <div className="event-details-icon-detail-div">
                        <img className="event-details-icon" src={calendarIcon} />
                        <p className="event-details-detail">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>

                    <div className="event-details-icon-detail-div">
                        <img className="event-details-icon" src={clockIcon} />
                        <p className="event-details-detail">{event.endTime
                            ? `${event.startTime} - ${event.endTime}`
                            : `${event.startTime} onwards`}</p>
                    </div>

                    {event.isPaid ? (
                        tickets.length > 0 && (
                            <div className="event-details-icon-detail-div">
                                <img className="event-details-icon" src={ticketIcon} alt="Ticket Icon" />
                                <p className="event-details-detail">
                                    {tickets.length === 1
                                        ? `Rs. ${tickets[0].ticketPrice}`
                                        : (() => {
                                            const prices = tickets.map(t => t.ticketPrice).sort((a, b) => a - b);
                                            return `Rs. ${prices[0]} - Rs. ${prices[prices.length - 1]}`;
                                        })()
                                    }
                                </p>
                            </div>
                        )
                    ) : event.totalSeats > 0 ? (
                        <p className="limited-seats-text">*limited seats</p>
                    ) : null}
                </div>

                {event.eventVideo.length > 0 && (
                    <div className="video-container">
                        <video
                            ref={videoRef}
                            src={`http://localhost:3000/event-videos/${event.eventVideo[0]}`}
                            className="custom-video"
                            controls={isPlaying}
                            poster="your-thumbnail.jpg"
                        />
                        {!isPlaying && (
                            <div className="video-overlay" onClick={handleVideoPlay}>
                                <button className="play-button">▶</button>
                            </div>
                        )}
                    </div>
                )}

                <div className="event-details-organizer-div">
                    <div className="event-details-organizer-img-name-div">
                        <img className="event-details-organizer-img" src={`http://localhost:3000/event-organizer-images/${event.eventOrganizerId.profilePicture}`} />
                        <p className="event-details-organizer-name">{event.eventOrganizerId.companyName}</p>
                    </div>

                    <div className="event-details-organizer-social-media-div">
                        {event?.eventOrganizerId?.socialMediaLinks?.map((link, index) => {
                            let icon = null;

                            if (link.includes("facebook.com")) {
                                icon = facebook;
                            } else if (link.includes("instagram.com")) {
                                icon = instagram;
                            } else if (link.includes("tiktok.com")) {
                                icon = tiktok;
                            } else if (link.includes("x.com") || link.includes("twitter.com")) {
                                icon = x;
                            }

                            return icon ? (
                                <a href={link} target="_blank" rel="noopener noreferrer" key={index}>
                                    <img src={icon} alt="social-icon" className="social-icon" />
                                </a>
                            ) : null;
                        })}
                    </div>

                </div>

                <div className="event-details-organizer-events-div">
                    <p className="event-details-organizer-events-text">More events from this organizer</p>
                    {organizerEvents.length === 0 ? (
                        <div className="no-organizer-events-div">
                            <img className="no-organizer-events-img" src={noOrganizerEvents} />
                            <p className="no-organizer-events-text">Looks like this is their only event for now</p>
                        </div>
                    ) : (
                        organizerEvents.map((event) => (
                            <div onClick={() => navigate(`/event-details/${event._id}`)}>
                                <SearchResult
                                    key={event._id}
                                    image={`http://localhost:3000/event-images/${event.eventPhoto}`}
                                    venue={event.venue}
                                    city={event.city}
                                    date={event.date}
                                    startTime={event.startTime}
                                    endTime={event.endTime}
                                    title={event.title}
                                    subtitle={event.subtitle}
                                    priceType={event.isPaid}
                                    totalSeats={event.totalSeats}
                                />
                            </div>
                        ))
                    )}
                </div>

                <div className="event-details-similar-events-div">
                    <p className="event-details-similar-events-text">Other similar events you may like</p>
                    <SimilarEvents eventType={event.eventType} currentEventId={event._id} />
                </div>
            </div>

            <Footer />

            {showBookingForm && (
                <>
                    <div className="event-details-overlay" onClick={() => setShowBookingForm(false)}></div>
                    <div className="event-details-form-modal">
                        <BookSeatsForm
                            closeForm={() => setShowBookingForm(false)}
                            eventId={event._id}
                            eventPhoto={`http://localhost:3000/event-images/${event.eventPhoto}`}
                            title={event.title}
                            venue={event.venue}
                            city={event.city}
                            date={event.date}
                            startTime={event.startTime}
                            endTime={event.endTime}
                            fullName={user?.fullName}
                            mobileNumber={user?.mobileNumber}
                            email={user?.email}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default EventDetails;