import "../css_files/organizer_events/archived_event_card.css";

function ArchivedEventCard({ eventPhoto, title, date, startTime, endTime, venue, city, isPaid, totalSeats, archivedDate }) {
    const now = new Date();
    const deletionDate = new Date(new Date(archivedDate).getTime() + 30 * 24 * 60 * 60 * 1000);
    const timeDiff = deletionDate - now;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return (
        <>
            <div className="archived-event-main-div">
                <img className="archived-event-img" src={`http://localhost:3000/event-images/${eventPhoto}`} />
                <p className="archived-event-title">{title}</p>

                <div className="archived-event-icon-detail-div">
                    <img className="archived-event-icon" src="src\assets\grey_calendar.png" />
                    <p className="archived-event-detail">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className="archived-event-icon-detail-div">
                    <img className="archived-event-icon" src="src\assets\grey_clock.png" />
                    <p className="archived-event-detail">{endTime
                        ? `${startTime} - ${endTime}`
                        : `${startTime} onwards`}</p>
                </div>

                <div className="archived-event-icon-detail-div">
                    <img className="archived-event-icon" src="src\assets\grey_location.png" />
                    <p className="archived-event-detail">{venue}, {city}</p>
                </div>

                <div className="archived-events-payment-div">
                    <div className={isPaid ? "paid" : "free"}>
                        {isPaid ? "Paid" : "Free"}
                    </div>
                    {totalSeats > 0 && <p className="limited-seats-text">*limited seats</p>}
                </div>

                <p className="archived-events-days">{daysLeft} days before deletion</p>

                <button className="archived-events-btn">Insights</button>
            </div>
        </>
    )
}

export default ArchivedEventCard;