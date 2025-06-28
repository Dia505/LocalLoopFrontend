import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth_context";

import ExplorerNavBar from "../../../components/navigation/explorer_nav_bar";
import ExplorerSideBar from "../../../components/navigation/explorer_side_bar";
import MyTicketCard from "../../../components/event_explorer/my_ticket_card";
import Footer from "../../../components/footer";
import "../../css_files/private/my_tickets.css";

function MyTickets() {
    const { authToken } = useAuth();
    const [upcomingTickets, setUpcomingTickets] = useState([]);
    const [pastTickets, setPastTickets] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("upcoming");

    useEffect(() => {
        const fetchUpcomingTickets = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/purchased-ticket/upcoming",
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setUpcomingTickets(response.data);
            } catch (error) {
                console.error("Error fetching upcoming tickets:", error);
            }
        };

        fetchUpcomingTickets();
    }, [authToken]);

    useEffect(() => {
        const fetchPastTickets = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/purchased-ticket/past",
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setPastTickets(response.data);
            } catch (error) {
                console.error("Error fetching past tickets:", error);
            }
        };

        fetchPastTickets();
    }, [authToken]);

    return (
        <>
            <div className="my-tickets-main-window">
                <ExplorerNavBar />

                <div className="my-tickets-centre-div">
                    <ExplorerSideBar />

                    <div className="my-tickets-main-section">
                        <p className="my-tickets-title">My Tickets</p>

                        <div className="my-tickets-filter-div">
                            <p
                                className={`my-tickets-filter-btn ${selectedFilter === "upcoming" ? "my-tickets-filter-btn-selected" : ""}`}
                                onClick={() => setSelectedFilter("upcoming")}
                            >
                                Upcoming
                            </p>

                            <p
                                className={`my-tickets-filter-btn ${selectedFilter === "past" ? "my-tickets-filter-btn-selected" : ""}`}
                                onClick={() => setSelectedFilter("past")}
                            >
                                Past
                            </p>
                        </div>

                        <div>
                            {selectedFilter === "upcoming" ? (
                                upcomingTickets.map((event) => (
                                    <MyTicketCard
                                        key={event._id}
                                        eventPhoto={`http://localhost:3000/event-images/${event.eventDetails.eventPhoto}`}
                                        venue={event.eventDetails.venue}
                                        city={event.eventDetails.city}
                                        date={event.eventDetails.date}
                                        startTime={event.eventDetails.startTime}
                                        endTime={event.eventDetails.endTime}
                                        title={event.eventDetails.title}
                                        quantity={event.quantity}
                                        ticketType={event.ticketDetails.ticketType}
                                        ticketPrice={event.ticketDetails.ticketPrice}
                                        totalPrice={event.totalPrice}
                                        paymentMethod={event.paymentMethod}
                                    />
                                ))
                            ) : (
                                pastTickets.map((event) => (
                                    <MyTicketCard
                                        key={event._id}
                                        eventPhoto={`http://localhost:3000/event-images/${event.eventDetails.eventPhoto}`}
                                        venue={event.eventDetails.venue}
                                        city={event.eventDetails.city}
                                        date={event.eventDetails.date}
                                        startTime={event.eventDetails.startTime}
                                        endTime={event.eventDetails.endTime}
                                        title={event.eventDetails.title}
                                        quantity={event.quantity}
                                        ticketType={event.ticketDetails.ticketType}
                                        ticketPrice={event.ticketDetails.ticketPrice}
                                        totalPrice={event.totalPrice}
                                        paymentMethod={event.paymentMethod}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="my-tickets-footer-div">
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default MyTickets;