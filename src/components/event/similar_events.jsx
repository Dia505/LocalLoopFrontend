import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth_context";

import calendarIcon from "../../assets/grey_calendar.png";
import clockIcon from "../../assets/grey_clock.png";
import locationIcon from "../../assets/grey_location.png";
import noSimilarEvents from "../../assets/no_similar_events.png";
import BookmarkIcon from "../bookmark_icon";
import "../css_files/event/similar_events.css";

function SimilarEvents({ eventType, currentEventId }) {
    const [similarEvents, setSimilarEvents] = useState([]);
    const navigate = useNavigate();
    const { authToken } = useAuth();
    const [soldOutEvents, setSoldOutEvents] = useState([]);

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
        if (!eventType) return;

        const fetchSimilarEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/event/event-type?eventType=${eventType}`);
                let events = response.data;

                events = events.filter(event => event._id !== currentEventId);

                const shuffled = events.sort(() => 0.5 - Math.random());
                const limited = shuffled.slice(0, 3);

                setSimilarEvents(limited);

                const soldOutEvents = [];

                for (const event of limited) {
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
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchSimilarEvents();
    }, [eventType, currentEventId]);

    return (
        <>
            <div className="similar-events-div">
                {similarEvents.length === 0 ? (
                    <div className="no-similar-events-div">
                        <img className="no-similar-events-img" src={noSimilarEvents} />
                        <p className="no-similar-events-text">We couldn't find other events like this right now. Stay tuned for more!</p>
                    </div>
                ) : (
                    similarEvents.map((event) => {
                        const isSoldOut =
                            soldOutEvents.some(se => se._id === event._id);
                        return (
                            <div key={event._id} className={
                                (event.isPaid || (!event.isPaid && event.totalSeats > 0)) &&
                                    !soldOutEvents.some(soldOut => soldOut._id === event._id)
                                    ? "similar-event-card-hover"
                                    : "similar-event-card"
                            } onClick={() => navigate(`/event-details/${event._id}`)}>
                                <img className="similar-event-img" src={`http://localhost:3000/event-images/${event.eventPhoto}`} />

                                <div className="similar-event-title-bookmark-div">
                                    <p className="similar-event-title">{event.title}</p>
                                    <BookmarkIcon eventId={event._id} />
                                </div>

                                <div className="similar-event-icon-detail-div">
                                    <img className="similar-event-icon" src={calendarIcon} />
                                    <p className="similar-event-detail">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>

                                <div className="similar-event-icon-detail-div">
                                    <img className="similar-event-icon" src={clockIcon} />
                                    <p className="similar-event-detail">{event?.endTime
                                        ? `${formatTo12Hour(event?.startTime)} - ${formatTo12Hour(event?.endTime)}`
                                        : `${formatTo12Hour(event?.startTime)} onwards`}</p>
                                </div>

                                <div className="similar-event-icon-detail-div">
                                    <img className="similar-event-icon" src={locationIcon} />
                                    <p className="similar-event-detail">{event.venue}, {event.city}</p>
                                </div>

                                <div className="similar-events-payment-div">
                                    <div
                                        className={
                                            isSoldOut
                                                ? "soldOut"
                                                : event.isPaid
                                                    ? "paid"
                                                    : "free"
                                        }
                                    >
                                        {isSoldOut ? "SOLD OUT" : event.isPaid ? "Paid" : "Free"}
                                    </div>
                                    {event.totalSeats > 0 && <p className="limited-seats-text">*limited seats</p>}
                                </div>

                                {(event.isPaid || (!event.isPaid && event.totalSeats > 0)) && (
                                    <button
                                        className="similar-events-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!event.isPaid) {
                                                if (authToken) {
                                                    navigate(`/event-details/${event._id}`, {
                                                        state: { openBookingForm: true },
                                                    });
                                                } else {
                                                    navigate("/login");
                                                }
                                            } else if (event.isPaid) {
                                                if (authToken) {
                                                    navigate(`/event-details/${event._id}`, {
                                                        state: { openBuyTicketForm: true },
                                                    });
                                                } else {
                                                    navigate("/login");
                                                }
                                            }
                                            else {
                                                navigate(`/event-details/${event._id}`);
                                            }
                                        }}
                                    >
                                        {event.isPaid ? "Buy tickets" : "Book seats"}
                                    </button>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </>
    )
}

export default SimilarEvents;