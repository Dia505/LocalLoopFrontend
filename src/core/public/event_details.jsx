import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auth_context";

import calendarIcon from "../../assets/grey_calendar.png";
import clockIcon from "../../assets/grey_clock.png";
import locationIcon from "../../assets/grey_location.png";
import ExplorerNavBar from "../../components/explorer_nav_bar";
import "../css_files/public/event_details.css";

function EventDetails() {
    const { _id } = useParams();
    const authToken = useAuth();
    const [event, setEvent] = useState(null);

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
                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default EventDetails;