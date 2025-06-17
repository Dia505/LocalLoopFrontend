import "../css_files/search/search_result.css";
import locationIcon from "../../assets/grey_location.png"
import calendarIcon from "../../assets/grey_calendar.png";
import clockIcon from "../../assets/grey_clock.png"

function SearchResult({ image, venue, city, date, startTime, endTime, title, subtitle, priceType, totalSeats }) {
    return (
        <>
            <div className={
                (priceType || (!priceType && totalSeats > 0))
                    ? "search-result-main-div-hover"
                    : "search-result-main-div"
            }>
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
                                ? `${startTime} - ${endTime}`
                                : `${startTime} onwards`}</p>
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

                <span className="material-symbols-outlined">
                    bookmark
                </span>
            </div>
        </>
    )
}

export default SearchResult;