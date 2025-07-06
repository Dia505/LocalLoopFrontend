import { useNavigate } from "react-router-dom";

import calendarIcon from "../../assets/grey_calendar.png";
import clockIcon from "../../assets/grey_clock.png";
import locationIcon from "../../assets/grey_location.png";
import BookmarkIcon from "../bookmark_icon";
import "../css_files/search/search_result.css";

function SearchResult({ image, venue, city, date, startTime, endTime, title, subtitle, priceType, totalSeats, eventId, isSoldOut, isFullyBooked }) {
    const navigate = useNavigate();

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

    return (
        <>
            <div className={
                (priceType || (!priceType && totalSeats > 0)) && !isSoldOut && !isFullyBooked
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

                        {/* For responsive screen */}
                        <div className="search-result-details-first-layer2">
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
                    </div>

                    <div className="search-result-payment-div">
                        <div className={
                            isSoldOut
                                ? "soldOut"
                                : isFullyBooked
                                    ? "soldOut"
                                    : priceType
                                        ? "paid"
                                        : "free"
                        }>
                            {isSoldOut
                                ? "SOLD OUT"
                                : isFullyBooked
                                    ? "Fully booked"
                                    : priceType
                                        ? "Paid"
                                        : "Free"}
                        </div>
                        {totalSeats > 0 && <p className="limited-seats-text">*limited seats</p>}
                        <div className="search-result-price-type-bookmark">
                            <BookmarkIcon eventId={eventId} />
                        </div>
                    </div>

                    {(priceType || (!priceType && totalSeats > 0)) && (
                        <button className="search-result-ticket-btn">
                            {priceType ? "Buy tickets" : "Book seats"}
                        </button>
                    )}
                </div>

                <div className="search-result-main-bookmark">
                    <BookmarkIcon eventId={eventId} />
                </div>
            </div>
        </>
    )
}

export default SearchResult;