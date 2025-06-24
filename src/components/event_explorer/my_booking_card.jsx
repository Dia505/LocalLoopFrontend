import calendarIcon from "../../assets/grey_calendar.png";
import clockIcon from "../../assets/grey_clock.png";
import locationIcon from "../../assets/grey_location.png";
import "../css_files/event_explorer/my_booking_card.css";

function MyBookingCard({ eventPhoto, title, venue, city, date, startTime, endTime, seats }) {
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
            <div className="my-booking-card-main-div">
                <img className="my-booking-card-img" src={eventPhoto} />

                <div className="my-booking-card-details-div">
                    <p className="my-booking-card-event-title">{title}</p>

                    <div className="my-booking-card-location-date-time-div">
                        <div className="my-booking-card-icon-detail-div">
                            <img className="my-booking-card-icon" src={locationIcon} />
                            <p className="my-booking-card-detail">{venue}, {city}</p>
                        </div>

                        <div className="my-booking-card-icon-detail-div">
                            <img className="my-booking-card-icon" src={calendarIcon} />
                            <p className="my-booking-card-detail">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>

                        <div className="my-booking-card-icon-detail-div">
                            <img className="my-booking-card-icon" src={clockIcon} />
                            <p className="my-booking-card-detail">{endTime
                                ? `${formatTo12Hour(startTime)} - ${formatTo12Hour(endTime)}`
                                : `${formatTo12Hour(startTime)} onwards`}</p>
                        </div>
                    </div>

                    <p className="my-booking-card-seats">Booked {seats} seats</p>
                </div>
            </div>
        </>
    )
}

export default MyBookingCard;