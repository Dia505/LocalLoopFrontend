import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth_context";

import calendar from "../../assets/calendar.png";
import clock from "../../assets/clock.png";
import location from "../../assets/location.png";
import "../css_files/event/book_seats_form.css";

function BookSeatsForm({ eventId, eventPhoto, title, venue, city, date, startTime, endTime, fullName, mobileNumber, email, closeForm }) {
    const [seats, setSeats] = useState(1);
    const { authToken } = useAuth();
    const { handleSubmit } = useForm();

    const increment = () => setSeats((prev) => prev + 1);
    const decrement = () => setSeats((prev) => (prev > 1 ? prev - 1 : 1));

    const onSubmit = async (data) => {
        const bookingData = {
            seats: seats,
            eventId: eventId
        };

        try {
            const resonse = await fetch("http://localhost:3000/api/booking",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingData),
                }
            );

            toast.success("Successfully booked seats", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
            });

            closeForm();
        } catch (err) {
            console.error("Error booking seats:", err);
            toast.error("Failed to book seats");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                <p>Full name</p>
                                <input
                                    type='text'
                                    value={fullName}
                                    disabled
                                />
                            </div>

                            <div>
                                <p>Mobile number</p>
                                <input
                                    type='text'
                                    value={mobileNumber}
                                    disabled
                                />
                            </div>

                            <div>
                                <p>Email address</p>
                                <input
                                    type='text'
                                    value={email}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="booking-form-btn-div">
                            <div>
                                <p>Number of seats</p>
                                <div className="seat-selector">
                                    <input
                                        type="text"
                                        value={seats}
                                        readOnly
                                        className="seat-input"
                                    />

                                    <p onClick={decrement} className="minus-seat-btn">-</p>
                                    <p className="seat-btn-divider">|</p>
                                    <p onClick={increment} className="plus-seat-btn">+</p>
                                </div>
                            </div>

                            <button type="submit" className="booking-form-button">Book seats</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default BookSeatsForm;