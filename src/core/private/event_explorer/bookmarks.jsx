import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth_context";
import axios from "axios";

import BookmarkIcon from "../../../components/bookmark_icon";
import ExplorerNavBar from "../../../components/navigation/explorer_nav_bar";
import ExplorerSideBar from "../../../components/navigation/explorer_side_bar";
import Footer from "../../../components/footer";
import "../../css_files/private/bookmarks.css";

function Bookmarks() {
    const [bookmarkedEventList, setBookmarkedEventList] = useState([]);
    const { authToken } = useAuth();

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
        const fetchBookmarkedEvents = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/bookmark/event-explorer", {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setBookmarkedEventList(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchBookmarkedEvents();
    }, [authToken]);

    return (
        <>
            <div className="bookmarks-main-window">
                <ExplorerNavBar />

                <div className="bookmarks-centre-div">
                    <ExplorerSideBar />

                    <div className="bookmarks-main-section">
                        <p className="bookmarks-title">Bookmarks</p>

                        <div className="bookmarks-div">
                            {bookmarkedEventList.map((bookmark) => (
                                <div key={bookmark._id} className={
                                    (bookmark.eventId.isPaid || (!bookmark.eventId.isPaid && bookmark.eventId.totalSeats > 0))
                                        ? "bookmark-card-hover"
                                        : "bookmark-card"
                                } onClick={() => navigate(`/event-details/${bookmark.eventId._id}`)}>
                                    <img className="bookmark-img" src={`http://localhost:3000/event-images/${bookmark.eventId.eventPhoto}`} />

                                    <div className="bookmark-title-bookmark-div">
                                        <p className="bookmark-title">{bookmark.eventId.title}</p>
                                        <BookmarkIcon eventId={bookmark.eventId._id} />
                                    </div>

                                    <div className="bookmark-icon-detail-div">
                                        <img className="bookmark-detail-icon" src="src\assets\grey_calendar.png" />
                                        <p className="bookmark-detail">{new Date(bookmark.eventId.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>

                                    <div className="bookmark-icon-detail-div">
                                        <img className="bookmark-detail-icon" src="src\assets\grey_clock.png" />
                                        <p className="bookmark-detail">{bookmark.eventId?.endTime
                                            ? `${formatTo12Hour(bookmark.eventId?.startTime)} - ${formatTo12Hour(bookmark.eventId?.endTime)}`
                                            : `${formatTo12Hour(bookmark.eventId?.startTime)} onwards`}</p>
                                    </div>

                                    <div className="bookmark-icon-detail-div">
                                        <img className="bookmark-detail-icon" src="src\assets\grey_location.png" />
                                        <p className="bookmark-detail">{bookmark.eventId.venue}, {bookmark.eventId.city}</p>
                                    </div>

                                    <div className="bookmark-payment-div">
                                        <div className={bookmark.eventId.isPaid ? "paid" : "free"}>
                                            {bookmark.eventId.isPaid ? "Paid" : "Free"}
                                        </div>
                                        {bookmark.eventId.totalSeats > 0 && <p className="limited-seats-text">*limited seats</p>}
                                    </div>

                                    {(bookmark.eventId.isPaid || (!bookmark.eventId.isPaid && bookmark.eventId.totalSeats > 0)) && (
                                        <button
                                            className="bookmark-btn"
                                            onClick={(e) => {
                                                e.stopPropagation(); //prevent card's click handler
                                                if (!bookmark.eventId.isPaid) {
                                                    if (authToken) {
                                                        navigate(`/event-details/${bookmark.eventId._id}`, {
                                                            state: { openBookingForm: true },
                                                        });
                                                    } else {
                                                        navigate("/login");
                                                    }
                                                } else if (bookmark.eventId.isPaid) {
                                                    if (authToken) {
                                                        navigate(`/event-details/${bookmark.eventId._id}`, {
                                                            state: { openBuyTicketForm: true },
                                                        });
                                                    } else {
                                                        navigate("/login");
                                                    }
                                                }
                                                else {
                                                    navigate(`/event-details/${bookmark.eventId._id}`);
                                                }
                                            }}
                                        >
                                            {bookmark.eventId.isPaid ? "Buy tickets" : "Book seats"}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        </>
    )
}

export default Bookmarks;