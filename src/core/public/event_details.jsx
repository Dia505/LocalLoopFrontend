import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth_context";

import facebook from "../../assets/facebook2.png";
import calendarIcon from "../../assets/grey_calendar.png";
import clockIcon from "../../assets/grey_clock.png";
import locationIcon from "../../assets/grey_location.png";
import ticketIcon from "../../assets/grey_ticket.png";
import instagram from "../../assets/instagram.png";
import noOrganizerEvents from "../../assets/no_organizer_events.png";
import tiktok from "../../assets/tiktok.png";
import BookmarkIcon from "../../components/bookmark_icon";
import SimilarEvents from "../../components/event/similar_events";
import Footer from "../../components/footer";
import ExplorerNavBar from "../../components/navigation/explorer_nav_bar";
import SearchResult from "../../components/search/search_result";

import BookSeatsForm from "../../components/event/book_seats_form";
import BuyTicketsForm from "../../components/event/buy_tickets_form";
import "../css_files/public/event_details.css";

function EventDetails() {
    const { _id } = useParams();
    const { authToken } = useAuth();
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [organizerEvents, setOrganizerEvents] = useState([]);
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();

    const [showBookingForm, setShowBookingForm] = useState(false);
    const [showBuyTicketsForm, setShowBuyTicketsForm] = useState(false);

    const [isSoldOut, setIsSoldOut] = useState(false);
    const [soldOutEvents, setSoldOutEvents] = useState([]);

    const [isFullyBooked, setIsFullyBooked] = useState(false);
    const [fullyBookedEvents, setFullyBookedEvents] = useState([]);

    const handleVideoPlay = () => {
        videoRef.current.play();
        setIsPlaying(true);
    };

    const formatTo12Hour = (timeStr) => {
        if (!timeStr) return "";

        const [hour, minute] = timeStr.split(":");
        const date = new Date();
        date.setHours(+hour, +minute);

        return date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).toLowerCase();
    };

    useEffect(() => {
        if (location.state?.toastMessage) {
            toast.success(location.state.toastMessage, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
            });
        }
    }, [location.state?.toastMessage]);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/event/${_id}`);
                const eventData = response.data;
                setEvent(eventData);

                if (!eventData.isPaid && eventData.totalSeats > 0) {
                    const fullyBookedResponse = await axios.get(
                        `http://localhost:3000/api/booking/full-booking/${_id}`
                    );
                    setIsFullyBooked(fullyBookedResponse.data?.fullyBooked ?? false);
                    setIsSoldOut(false);
                    return;
                }

                if (eventData.isPaid) {
                    const soldOutResponse = await axios.get(
                        `http://localhost:3000/api/ticket/soldOut/${_id}`
                    );
                    setIsSoldOut(soldOutResponse.data?.soldOut ?? false);
                    setIsFullyBooked(false);
                    return;
                }

                setIsSoldOut(false);
                setIsFullyBooked(false);

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
                    const response = await axios.get(`http://localhost:3000/api/event/upcoming/event-organizer/${organizerId}`);
                    const otherEvents = response.data.filter(e => e._id !== event._id);

                    const shuffled = otherEvents.sort(() => 0.5 - Math.random());
                    const randomTwo = shuffled.slice(0, 2);

                    setOrganizerEvents(randomTwo);

                    const soldOutEvents = [];

                    for (const event of randomTwo) {
                        if (!event.isPaid) continue;

                        const soldOutResponse = await axios.get(
                            `http://localhost:3000/api/ticket/soldOut/${event._id}`
                        );

                        const isSoldOut = soldOutResponse?.data?.soldOut;

                        if (isSoldOut) {
                            soldOutEvents.push(event);
                        }
                    }

                    setSoldOutEvents(soldOutEvents);

                    for (const event of randomTwo) {
                        if (event.totalSeats === 0) continue;

                        const fullBookingResponse = await axios.get(
                            `http://localhost:3000/api/booking/full-booking/${event._id}`
                        );

                        const isFullyBooked = fullBookingResponse?.data?.fullyBooked;

                        if (isFullyBooked) {
                            fullyBookedEvents.push(event);
                        }
                    }

                    setFullyBookedEvents(fullyBookedEvents);
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
                const userId = decoded._id;

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

    useEffect(() => {
        if (location.state?.openBookingForm && !event?.isPaid && authToken) {
            setShowBookingForm(true);
            window.history.replaceState({}, ''); // Optional: clear state
        }
        else if (location.state?.openBuyTicketForm && event?.isPaid && authToken) {
            setShowBuyTicketsForm(true);
            window.history.replaceState({}, '');
        }
    }, [location.key, event?._id, authToken]);

    if (!event) {
        return (
            <div className="event-details-main-window">
                <ExplorerNavBar />
                <p className="event-loading-msg">Loading event details...</p>
            </div>
        );
    };

    console.log("Is event fully booked?", isFullyBooked);

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
                            {isSoldOut ? (
                                <div className="event-details-sold-out-div">
                                    SOLD OUT
                                </div>
                            ) : isFullyBooked ? (
                                <div className="event-details-sold-out-div">
                                    Fully booked
                                </div>
                            ) : (event.isPaid || (!event.isPaid && event.totalSeats > 0)) && (
                                <button
                                    className="event-details-ticket-btn"
                                    onClick={() => {
                                        if (!event.isPaid) {
                                            if (authToken) {
                                                setShowBookingForm(true);
                                            } else {
                                                navigate("/login");
                                            }
                                        } else {
                                            if (authToken) {
                                                setShowBuyTicketsForm(true);
                                            } else {
                                                navigate("/login");
                                            }
                                        }
                                    }}
                                >
                                    {event.isPaid ? "Buy tickets" : "Book seats"}
                                </button>
                            )}


                            <BookmarkIcon eventId={event._id} />
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
                        <p className="event-details-detail">{event?.endTime
                            ? `${formatTo12Hour(event?.startTime)} - ${formatTo12Hour(event?.endTime)}`
                            : `${formatTo12Hour(event?.startTime)} onwards`}</p>
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
                        <div className="event-details-organizer-event-container">
                            {organizerEvents.map((event) => {
                                const isSoldOut = soldOutEvents.some(e => e._id === event._id);
                                const isFullyBooked = fullyBookedEvents.some(fb => fb._id === event._id);

                                return (
                                    <div onClick={() => navigate(`/event-details/${event._id}`)} key={event._id}>
                                        <SearchResult
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
                                            eventId={event._id}
                                            isSoldOut={isSoldOut}
                                            isFullyBooked={isFullyBooked}
                                        />
                                    </div>
                                );
                            })}

                        </div>
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

            {showBuyTicketsForm && (
                <>
                    <div className="event-details-overlay" onClick={() => setShowBuyTicketsForm(false)}></div>
                    <div className="event-details-form-modal">
                        <BuyTicketsForm
                            closeForm={() => setShowBuyTicketsForm(false)}
                            eventId={event._id}
                            eventPhoto={`http://localhost:3000/event-images/${event.eventPhoto}`}
                            title={event.title}
                            venue={event.venue}
                            city={event.city}
                            date={event.date}
                            startTime={event.startTime}
                            endTime={event.endTime}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default EventDetails;