import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth_context";

import "../css_files/home/upcoming_event_card.css";

function UpcomingEventCard() {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const { authToken } = useAuth();
    const navigate = useNavigate();
    const [bookmarkedEvents, setBookmarkedEvents] = useState({});

    let userId = null;
    if (authToken) {
        const decoded = jwtDecode(authToken);
        userId = decoded._id || decoded.id;
    }

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
                const response = await axios.get("http://localhost:3000/api/event/home-events");
                setUpcomingEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchUpcomingEvents();
    }, [authToken]);

    const toggleBookmark = (e, eventId) => {
        e.stopPropagation();

        const bookmarkId = bookmarkedEvents[eventId]; // already saved in state

        if (bookmarkId) {
            //UNBOOKMARK
            unbookmarkEvent.mutate(bookmarkId, {
                onSuccess: () => {
                    // Remove from state
                    setBookmarkedEvents(prev => {
                        const updated = { ...prev };
                        delete updated[eventId];
                        return updated;
                    });
                }
            });
        } else {
            //BOOKMARK
            const requestData = {
                eventExplorerId: userId,
                eventId
            };

            bookmarkEvent.mutate(requestData, {
                onSuccess: (response) => {
                    const newBookmarkId = response.data?._id;
                    if (newBookmarkId) {
                        setBookmarkedEvents(prev => ({
                            ...prev,
                            [eventId]: newBookmarkId
                        }));
                    }
                }
            });
        }
    };

    useEffect(() => {
        if (!authToken) return;

        const fetchBookmarks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/bookmark/event-explorer", {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });

                const bookmarks = response.data || [];

                const bookmarksMap = {};
                bookmarks.forEach(bookmark => {
                    const eventId = bookmark.eventId?._id;
                    const bookmarkId = bookmark._id;
                    if (eventId) {
                        bookmarksMap[eventId] = bookmarkId;
                    }
                });

                setBookmarkedEvents(bookmarksMap);

            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            }
        };

        fetchBookmarks();
    }, [authToken]);

    const bookmarkEvent = useMutation({
        mutationKey: "SAVEDATA",
        mutationFn: ({ eventExplorerId, eventId }) => {
            return axios.post(
                "http://localhost:3000/api/bookmark",
                { eventExplorerId, eventId },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );
        },
        onSuccess: () => toast.success("Event bookmarked", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
        })
    });

    const unbookmarkEvent = useMutation({
        mutationKey: "UNSAVEDATA",
        mutationFn: (bookmarkId) => {
            return axios.delete(`http://localhost:3000/api/bookmark/${bookmarkId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        },
        onSuccess: () => toast.success("Bookmark removed", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
        })
    });

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
                            <span
                                className={`material-symbols-outlined bookmark-icon ${bookmarkedEvents[event._id] ? "active" : ""}`}
                                onClick={(e) => toggleBookmark(e, event._id)}
                            >
                                bookmark
                            </span>
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
                            <div className={event.isPaid ? "paid" : "free"}>
                                {event.isPaid ? "Paid" : "Free"}
                            </div>
                            {event.totalSeats > 0 && <p className="limited-seats-text">*limited seats</p>}
                        </div>

                        {(event.isPaid || (!event.isPaid && event.totalSeats > 0)) && (
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
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default UpcomingEventCard;