import "../css_files/event/book_seats_form.css";
import location from "../../assets/location.png";
import calendar from "../../assets/calendar.png";
import clock from "../../assets/clock.png";

function BookSeatsForm({ eventPhoto, title, venue, city, date, startTime, endTime, fullName, mobileNumber, email, closeForm }) {

    return (
        <>
            <form>
                <div className="booking-form-main-div">
                    <div className="booking-form-top-div">
                        <img className="booking-form-img" src={eventPhoto} />

                        <div className="booking-form-event-details-div">
                            <p className="booking-form-close-btn" onClick={closeForm}>X</p>

                            <div className="booking-form-title-div">
                                <p className="booking-form-title">{title}</p>
                            </div>

                            <div className="booking-form-details-container">
                                <div className="booking-form-icon-detail-div">
                                    <img className="booking-form-icon" src={location} />
                                    <p className="booking-form-detail">{venue}, {city}</p>
                                </div>

                                <div className="booking-form-icon-detail-div">
                                    <img className="booking-form-icon" src={calendar} />
                                    <p className="booking-form-detail">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>

                                <div className="booking-form-icon-detail-div">
                                    <img className="booking-form-icon" src={clock} />
                                    <p className="booking-form-detail">{endTime
                                        ? `${startTime} - ${endTime}`
                                        : `${startTime} onwards`}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="booking-form-bottom-div">
                        <div className="booking-form-explorer-details-div">
                            <div>
                                <p className='booking-form-input-label'>Full name</p>
                                <input
                                    type='text'
                                    value={fullName}
                                    disabled
                                />
                            </div>

                            <div>
                                <p className='booking-form-input-label'>Mobile number</p>
                                <input
                                    type='text'
                                    value={mobileNumber}
                                    disabled
                                />
                            </div>

                            <div>
                                <p className='booking-form-input-label'>Email address</p>
                                <input
                                    type='text'
                                    value={email}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="booking-form-btn-div">
                            
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default BookSeatsForm;