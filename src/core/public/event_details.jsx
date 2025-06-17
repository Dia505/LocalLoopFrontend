import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auth_context";

import facebook from "../../assets/facebook2.png";
import calendarIcon from "../../assets/grey_calendar.png";
import clockIcon from "../../assets/grey_clock.png";
import locationIcon from "../../assets/grey_location.png";
import ticketIcon from "../../assets/grey_ticket.png";
import instagram from "../../assets/instagram.png";
import tiktok from "../../assets/tiktok.png";
import ExplorerNavBar from "../../components/explorer_nav_bar";
import "../css_files/public/event_details.css";

function EventDetails() {
    const { _id } = useParams();
    const authToken = useAuth();
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState([]);

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
                                <button className="event-details-ticket-btn">
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
            </div>
        </div>
    );
}

export default EventDetails;