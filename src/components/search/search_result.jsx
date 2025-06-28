import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth_context";

import calendarIcon from "../../assets/grey_calendar.png";
import clockIcon from "../../assets/grey_clock.png";
import locationIcon from "../../assets/grey_location.png";
import "../css_files/search/search_result.css";

function SearchResult({ image, venue, city, date, startTime, endTime, title, subtitle, priceType, totalSeats, eventId }) {
    const navigate = useNavigate();
    const {authToken} = useAuth();
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

    const toggleBookmark = (e, eventId) => {
        e.stopPropagation();

        const bookmarkId = bookmarkedEvents[eventId]; 

        if (bookmarkId) {
            unbookmarkEvent.mutate(bookmarkId, {
                onSuccess: () => {
                    setBookmarkedEvents(prev => {
                        const updated = { ...prev };
                        delete updated[eventId];
                        return updated;
                    });
                }
            });
        } else {
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
            <div className={
                (priceType || (!priceType && totalSeats > 0))
                    ? "search-result-main-div-hover"
                    : "search-result-main-div"
            } onClick={() => navigate(`/event-details/${eventId}`)}>
                <img className="search-result-img" src={image} />

                <div className="search-result-details-div">
                    <div className="search-result-details-first-layer">
                        <div className="search-result-icon-detail-div">
                            <img className="search-result-icon" src={locationIcon} />
                            <p className="search-result-detail">{venue}, {city}</p>
                        </div>

                        <div className="search-result-icon-detail-div">
                            <img className="search-result-icon" src={calendarIcon} />
                            <p className="search-result-detail">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>

                        <div className="search-result-icon-detail-div">
                            <img className="search-result-icon" src={clockIcon} />
                            <p className="search-result-detail">{endTime
                                ? `${formatTo12Hour(startTime)} - ${formatTo12Hour(endTime)}`
                                : `${formatTo12Hour(startTime)} onwards`}</p>
                        </div>
                    </div>

                    <div className="search-result-details-second-layer">
                        <p className="search-result-title">{title}</p>
                        <div className="search-result-subtitle-div">
                            <p className="search-result-subtitle">{subtitle}</p>
                        </div>
                    </div>

                    <div className="search-result-payment-div">
                        <div className={priceType ? "paid" : "free"}>
                            {priceType ? "Paid" : "Free"}
                        </div>
                        {totalSeats > 0 && <p className="limited-seats-text">*limited seats</p>}
                    </div>

                    {(priceType || (!priceType && totalSeats > 0)) && (
                        <button className="search-result-ticket-btn">
                            {priceType ? "Buy tickets" : "Book seats"}
                        </button>
                    )}
                </div>

                <span
                    className={`material-symbols-outlined bookmark-icon ${bookmarkedEvents[eventId] ? "active" : ""}`}
                    onClick={(e) => toggleBookmark(e, eventId)}
                >
                    bookmark
                </span>
            </div>
        </>
    )
}

export default SearchResult;