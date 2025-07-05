import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useAuth } from "../../context/auth_context";
import { useNavigate } from 'react-router-dom';

import calendar from "../../assets/calendar.png";
import clock from "../../assets/clock.png";
import esewa from "../../assets/esewa.png";
import khalti from "../../assets/khalti.png";
import loading from "../../assets/loading.gif";
import location from "../../assets/location.png";
import "../css_files/event/buy_tickets_form.css";

const ticketDetailsSchema = yup.object().shape({
    ticketType: yup.string().required("*required")
});

function BuyTicketsForm({ eventId, eventPhoto, title, venue, city, date, startTime, endTime, closeForm }) {
    const {
        register,
        formState: { errors },
        trigger,
        getValues
    } = useForm({
        resolver: yupResolver(ticketDetailsSchema),
        mode: "all"
    });

    const { authToken } = useAuth();

    const navigate = useNavigate();

    const [ticketAmount, setTicketAmount] = useState(1);
    const [ticketDetails, setTicketDetails] = useState([]);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [buyTicketFormState, setBuyTicketFormState] = useState(1);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const increment = () => setTicketAmount((prev) => prev + 1);
    const decrement = () => setTicketAmount((prev) => (prev > 1 ? prev - 1 : 1));

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
        const fetchTicketDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/ticket/event/${eventId}`);
                setTicketDetails(response.data);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };
        fetchTicketDetails();
    }, [eventId]);

    const handleNext = async () => {
        const valid = await trigger(["ticketType"]);
        if (valid) {
            setBuyTicketFormState(2);
        }
    };

    const handleBuyTickets = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const ticketTypeId = getValues("ticketType");

        if (!selectedPaymentMethod) {
            toast.error("Please select a payment method.");
            setIsLoading(false);
            return;
        }

        try {
            await axios.post(
                "http://localhost:3000/api/purchased-ticket",
                {
                    ticketId: ticketTypeId,
                    quantity: ticketAmount,
                    paymentMethod: selectedPaymentMethod,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            // Show payment processing screen
            navigate("/payment-processing", {
                state: {
                    paymentMethod: selectedPaymentMethod,
                    redirectTo: `/event-details/${eventId}`, // make sure eventId is accessible
                    toastMessage: "Tickets purchased successfully! We've sent you a confirmation email.",
                },
            });
        } catch (error) {
            console.error("Error purchasing ticket:", error);
            toast.error("Failed to purchase tickets");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="buy-tickets-form-main-div">
                <div className="buy-tickets-form-top-div">
                    <img className="buy-tickets-form-img" src={eventPhoto} />

                    <div className="buy-tickets-form-event-details-div">
                        <p className="buy-tickets-form-close-btn" onClick={closeForm}>X</p>

                        <div className="buy-tickets-form-title-div">
                            <p className="buy-tickets-form-title">{title}</p>
                        </div>

                        <div className="buy-tickets-form-details-container">
                            <div className="buy-tickets-form-icon-detail-div">
                                <img className="buy-tickets-form-icon" src={location} />
                                <p className="buy-tickets-form-detail">{venue}, {city}</p>
                            </div>

                            <div className="buy-tickets-form-icon-detail-div">
                                <img className="buy-tickets-form-icon" src={calendar} />
                                <p className="buy-tickets-form-detail">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>

                            <div className="buy-tickets-form-icon-detail-div">
                                <img className="buy-tickets-form-icon" src={clock} />
                                <p className="buy-tickets-form-detail">{endTime
                                    ? `${formatTo12Hour(startTime)} - ${formatTo12Hour(endTime)}`
                                    : `${formatTo12Hour(startTime)} onwards`}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {buyTicketFormState === 1 && (
                    <div className="buy-tickets-form-bottom-div">
                        <div className="buy-tickets-form-ticket-type-div">
                            <div>
                                <p>Ticket type</p>
                                <select
                                    defaultValue=""
                                    className={errors.ticketType ? 'buy-tickets-form-select-error' : 'buy-tickets-form-select'}
                                    {...register("ticketType")}
                                    onChange={(e) => {
                                        const selectedTicketId = e.target.value;
                                        const selectedTicket = ticketDetails.find(ticket => ticket._id === selectedTicketId);
                                        if (selectedTicket) {
                                            setTicketPrice(selectedTicket.ticketPrice);
                                        }
                                    }}
                                >
                                    <option value="" disabled>Select a ticket</option>

                                    {ticketDetails?.map((ticket) => (
                                        <option key={ticket._id} value={ticket._id}>
                                            {ticket.ticketType} | Rs. {ticket.ticketPrice}
                                        </option>
                                    ))}
                                </select>

                                {errors.ticketType && <p className="error-message">{errors.ticketType.message}</p>}
                            </div>

                            <div>
                                <p>Number of tickets</p>
                                <div className="ticket-amount-selector">
                                    <input
                                        type="text"
                                        value={ticketAmount}
                                        readOnly
                                        className="ticket-amount-input"
                                    />

                                    <p onClick={decrement} className="minus-ticket-amount-btn">-</p>
                                    <p className="ticket-amount-btn-divider">|</p>
                                    <p onClick={increment} className="plus-ticket-amount-btn">+</p>
                                </div>
                            </div>

                            <button type='submit' className="buy-tickets-form-next-button" onClick={handleNext}>Next</button>
                        </div>

                        <div className='buy-tickets-form-divider'></div>

                        <div className='ticket-summary-div'>
                            <p className='ticket-summary-text'>Ticket summary</p>
                            <p>Rs. {ticketPrice} X {ticketAmount}</p>
                            <div className='ticket-summary-divider'></div>

                            <div className='buy-tickets-total-price-div'>
                                <p>Total</p>
                                <p>Rs. {ticketPrice * ticketAmount}</p>
                            </div>
                        </div>
                    </div>
                )}

                {buyTicketFormState === 2 && (
                    <form>
                        <div className="payment-method-form-bottom-div">
                            <div className='ticket-summary-div'>
                                <p className='ticket-summary-text'>Ticket summary</p>
                                <p>Rs. {ticketPrice} X {ticketAmount}</p>
                                <div className='ticket-summary-divider'></div>

                                <div className='buy-tickets-total-price-div'>
                                    <p>Total</p>
                                    <p>Rs. {ticketPrice * ticketAmount}</p>
                                </div>
                            </div>

                            <div>
                                <p className='ticket-summary-text'>Select a payment method</p>

                                <div className='payment-methods-div'>
                                    <img
                                        className={selectedPaymentMethod === "esewa" ? 'selected-esewa-img' : 'esewa-img'}
                                        src={esewa}
                                        onClick={() => setSelectedPaymentMethod("esewa")}
                                    />

                                    <img
                                        className={selectedPaymentMethod === "khalti" ? 'selected-khalti-img' : 'khalti-img'}
                                        src={khalti}
                                        onClick={() => setSelectedPaymentMethod("khalti")}
                                    />
                                </div>

                                {isLoading
                                    ? <img src={loading} className="buy-tickets-form-loading" />
                                    : <div className='payment-method-form-btns-div'>
                                        <button className='payment-method-form-btn' onClick={() => setBuyTicketFormState(1)}>Previous</button>
                                        <button type='submit' className='payment-method-form-btn' onClick={handleBuyTickets}>Buy tickets</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}

export default BuyTicketsForm;