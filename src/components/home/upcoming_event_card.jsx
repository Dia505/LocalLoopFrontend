import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth_context";

import BookmarkIcon from "../bookmark_icon";
import "../css_files/home/upcoming_event_card.css";

function UpcomingEventCard() {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const { authToken } = useAuth();
    const navigate = useNavigate();
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
        const fetchUpcomingEvents = async () => {
            try {
                const eventResponse = await axios.get("http://localhost:3000/api/event/home-events");
                const events = eventResponse.data;

                setUpcomingEvents(events);

                const soldOutEvents = [];

                for (const event of events) {
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
                console.error("Error fetching sold out events:", error);
            }
        };

        fetchUpcomingEvents();
    }, [authToken]);

    console.log(soldOutEvents);

    return (
        <>
            <div className="upcoming-events-div">
                {upcomingEvents.map((event) => {
                    const isSoldOut =
                        soldOutEvents.some(se => se._id === event._id);
                    return (
                        <div key={event._id} className={
                            (event.isPaid || (!event.isPaid && event.totalSeats > 0)) &&
                                !soldOutEvents.some(soldOut => soldOut._id === event._id)
                                ? "upcoming-event-card-hover"
                                : "upcoming-event-card"
                        } onClick={() => navigate(`/event-details/${event._id}`)}>
                            <img className="upcoming-event-img" src={`http://localhost:3000/event-images/${event.eventPhoto}`} />

                            <div className="upcoming-event-details-div">
                                <div className="upcoming-event-title-bookmark-div">
                                    <p className="upcoming-event-title">{event.title}</p>
                                    <BookmarkIcon eventId={event._id} />
                                </div>

                                <div className="upcoming-event-icon-detail-div">
                                    <img className="upcoming-event-icon" src="src\assets\grey_calendar.png" />
                                    <p className="upcoming-event-detail">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>

                                <div className="upcoming-event-icon-detail-div">
                                    <img className="upcoming-event-icon" src="src\assets\grey_clock.png" />
                                    <p className="upcoming-event-detail">{event?.endTime
                                        ? `${formatTo12Hour(event?.startTime)} - ${formatTo12Hour(event?.endTime)}`
                                        : `${formatTo12Hour(event?.startTime)} onwards`}</p>
                                </div>

                                <div className="upcoming-event-icon-detail-div">
                                    <img className="upcoming-event-icon" src="src\assets\grey_location.png" />
                                    <p className="upcoming-event-detail">{event.venue}, {event.city}</p>
                                </div>

                                <div className="upcoming-events-payment-div">
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
                            </div>

                            {(event.isPaid || (!event.isPaid && event.totalSeats > 0)) && (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        className="upcoming-events-btn"
                                        onClick={(e) => {
                                            e.stopPropagation(); //prevent card's click handler
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
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default UpcomingEventCard;