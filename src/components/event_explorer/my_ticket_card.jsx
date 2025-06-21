import calendarIcon from "../../assets/grey_calendar.png";
import clockIcon from "../../assets/grey_clock.png";
import locationIcon from "../../assets/grey_location.png";
import "../css_files/event_explorer/my_ticket_card.css";

function MyTicketCard({ eventPhoto, title, venue, city, date, startTime, endTime, quantity, ticketType, ticketPrice, totalPrice, paymentMethod }) {
    return (
        <>
            <div className="my-ticket-card-main-div">
                <div className="my-ticket-card-event-details-div">
                    <img className="my-ticket-card-img" src={eventPhoto} />

                    <div className="my-ticket-card-details-div">
                        <p className="my-ticket-card-event-title">{title}</p>

                        <div className="my-ticket-card-location-date-time-div">
                            <div className="my-ticket-card-icon-detail-div">
                                <img className="my-ticket-card-icon" src={locationIcon} />
                                <p className="my-ticket-card-detail">{venue}, {city}</p>
                            </div>

                            <div className="my-ticket-card-icon-detail-div">
                                <img className="my-ticket-card-icon" src={calendarIcon} />
                                <p className="my-ticket-card-detail">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>

                            <div className="my-ticket-card-icon-detail-div">
                                <img className="my-ticket-card-icon" src={clockIcon} />
                                <p className="my-ticket-card-detail">{endTime
                                    ? `${startTime} - ${endTime}`
                                    : `${startTime} onwards`}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-ticket-card-ticket-details-div">
                    <p className="my-ticket-card-ticket-details-text">Ticket details</p>

                    <div className="my-ticket-card-ticket-details">
                        <p>{quantity} X {ticketType} | Rs. {ticketPrice}</p>
                        <p>Total price: Rs. {totalPrice} (via {paymentMethod})</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyTicketCard;