import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth_context";
import "../css_files/organizer_events/insights.css";

function Insights({ event, closeForm }) {
    const [totalTicketsCount, setTotalTicketsCount] = useState(0);
    const [totalRevenueCount, setTotalRevenueCount] = useState(0);
    const [totalBookingCount, setTotalBookingCount] = useState(0);
    const [totalBookmarkCount, setTotalBookmarkCount] = useState(0);

    const { authToken } = useAuth();

    useEffect(() => {
        const fetchTicketAndRevenue = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/ticket/event/${event._id}`);
                const tickets = response.data;

                const totalSold = tickets.reduce((sum, ticket) => sum + (ticket.sold || 0), 0);
                setTotalTicketsCount(totalSold);

                const totalRevenue = tickets.reduce((sum, ticket) => {
                    return sum + (ticket.ticketPrice * ticket.sold || 0);
                }, 0);
                setTotalRevenueCount(totalRevenue);

            } catch (error) {
                console.error("Error fetching ticket stats:", error);
            }
        };

        fetchTicketAndRevenue();
    }, [event._id]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/booking/event/${event._id}`);
                const bookings = response.data;

                const totalBooked = bookings.reduce((sum, booking) => sum + (booking.seats || 0), 0);
                setTotalBookingCount(totalBooked);

            } catch (error) {
                console.error("Error fetching booking stats:", error);
            }
        };

        fetchBookings();
    }, [event._id]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/bookmark/event/${event._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setTotalBookmarkCount(response.data.totalBookmarks);
            }
            catch (error) {
                console.error("Error fetching bookmark stats:", error);
            }
        };

        fetchBookmarks();
    }, [event._id]);

    return (
        <>
            <div className="insights-main-div">
                <div className="insights-title-div">
                    <p className="insights-title">{event.title}</p>
                    <p className="insights-close-btn" onClick={closeForm}>X</p>
                </div>

                <div className="insights-stats-div">
                    {event.isPaid && (
                        <div className="insights-stat">
                            <p>Total tickets sold</p>
                            <p className="insights-number">{totalTicketsCount}</p>
                        </div>
                    )}

                    {event.isPaid && (
                        <div className="insights-stat">
                            <p>Total revenue generated</p>
                            <p className="insights-revenue">Rs. {totalRevenueCount}</p>
                        </div>
                    )}

                    {!event.isPaid && event.totalSeats>0 && (
                        <div className="insights-stat">
                            <p>Total seats booked</p>
                            <p className="insights-number">{totalBookingCount}</p>
                        </div>
                    )}

                    <div className="insights-stat">
                        <p>Total bookmarks</p>
                        <p className="insights-number">{totalBookmarkCount}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Insights;