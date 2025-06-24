import { useNavigate } from "react-router-dom";
import "../css_files/organizer_events/upcoming_event_card.css";

function UpcomingEventCard({ eventPhoto, title, date, startTime, endTime, venue, city, isPaid, totalSeats, _id }) {
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
            <div className="org-upcoming-event-main-div">
                <img className="org-upcoming-event-img" src={`http://localhost:3000/event-images/${eventPhoto}`} />
                <p className="org-upcoming-event-title">{title}</p>

                <div className="org-upcoming-event-icon-detail-div">
                    <img className="org-upcoming-event-icon" src="src\assets\grey_calendar.png" />
                    <p className="org-upcoming-event-detail">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className="org-upcoming-event-icon-detail-div">
                    <img className="org-upcoming-event-icon" src="src\assets\grey_clock.png" />
                    <p className="org-upcoming-event-detail">{endTime
                        ? `${formatTo12Hour(startTime)} - ${formatTo12Hour(endTime)}`
                        : `${formatTo12Hour(startTime)} onwards`}</p>
                </div>

                <div className="org-upcoming-event-icon-detail-div">
                    <img className="org-upcoming-event-icon" src="src\assets\grey_location.png" />
                    <p className="org-upcoming-event-detail">{venue}, {city}</p>
                </div>

                <div className="org-upcoming-events-payment-div">
                    <div className={isPaid ? "paid" : "free"}>
                        {isPaid ? "Paid" : "Free"}
                    </div>
                    {totalSeats > 0 && <p className="limited-seats-text">*limited seats</p>}
                </div>

                <div className="org-upcoming-events-btns-div">
                    <button className="org-upcoming-events-btn" onClick={() => navigate(`/view-event/${_id}`)}>Details</button>
                    <button className="org-upcoming-events-btn">Insights</button>
                </div>
            </div>
        </>
    )
}

export default UpcomingEventCard;