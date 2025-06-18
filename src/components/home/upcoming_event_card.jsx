import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth_context";
import { useNavigate } from "react-router-dom";

import "../css_files/home/upcoming_event_card.css";

function UpcomingEventCard() {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const { authToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/event/home-events");
                setUpcomingEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchUpcomingEvents();
    }, [authToken]);

    return (
        <>
            <div className="upcoming-events-div">
                {upcomingEvents.map((event) => (
                    <div key={event._id} className={
                        (event.isPaid || (!event.isPaid && event.totalSeats > 0))
                            ? "upcoming-event-card-hover"
                            : "upcoming-event-card"
                    } onClick={() => navigate(`/event-details/${event._id}`)}>
                        <img className="upcoming-event-img" src={`http://localhost:3000/event-images/${event.eventPhoto}`} />

                        <div className="upcoming-event-title-bookmark-div">
                            <p className="upcoming-event-title">{event.title}</p>
                            <span className="material-symbols-outlined">
                                bookmark
                            </span>
                        </div>

                        <div className="upcoming-event-icon-detail-div">
                            <img className="upcoming-event-icon" src="src\assets\grey_calendar.png" />
                            <p className="upcoming-event-detail">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>

                        <div className="upcoming-event-icon-detail-div">
                            <img className="upcoming-event-icon" src="src\assets\grey_clock.png" />
                            <p className="upcoming-event-detail">{event.endTime
                                ? `${event.startTime} - ${event.endTime}`
                                : `${event.startTime} onwards`}</p>
                        </div>

                        <div className="upcoming-event-icon-detail-div">
                            <img className="upcoming-event-icon" src="src\assets\grey_location.png" />
                            <p className="upcoming-event-detail">{event.venue}, {event.city}</p>
                        </div>

                        <div className="upcoming-events-payment-div">
                            <div className={event.isPaid ? "paid" : "free"}>
                                {event.isPaid ? "Paid" : "Free"}
                            </div>
                            {event.totalSeats > 0 && <p className="limited-seats-text">*limited seats</p>}
                        </div>

                        {(event.isPaid || (!event.isPaid && event.totalSeats > 0)) && (
                            <button className="upcoming-events-btn">
                                {event.isPaid ? "Buy tickets" : "Book seats"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default UpcomingEventCard;