import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth_context";

import MyBookingCard from "../../../components/event_explorer/my_booking_card";
import ExplorerNavBar from "../../../components/navigation/explorer_nav_bar";
import ExplorerSideBar from "../../../components/navigation/explorer_side_bar";
import Footer from "../../../components/footer";
import "../../css_files/private/my_bookings.css";

function MyBookings() {
    const { authToken } = useAuth();
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("upcoming");

    useEffect(() => {
        const fetchUpcomingBookings = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/booking/upcoming",
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setUpcomingBookings(response.data);
            } catch (error) {
                console.error("Error fetching upcoming bookings:", error);
            }
        };

        fetchUpcomingBookings();
    }, [authToken]);

    useEffect(() => {
        const fetchPastBookings = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/booking/past",
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setPastBookings(response.data);
            } catch (error) {
                console.error("Error fetching past bookings:", error);
            }
        };

        fetchPastBookings();
    }, [authToken]);

    return (
        <>
            <div className="my-bookings-main-window">
                <ExplorerNavBar />

                <div className="my-bookings-centre-div">
                    <ExplorerSideBar />

                    <div className="my-bookings-main-section">
                        <p className="my-bookings-title">My Bookings</p>

                        <div className="my-bookings-filter-div">
                            <p
                                className={`my-bookings-filter-btn ${selectedFilter === "upcoming" ? "my-bookings-filter-btn-selected" : ""}`}
                                onClick={() => setSelectedFilter("upcoming")}
                            >
                                Upcoming
                            </p>

                            <p
                                className={`my-bookings-filter-btn ${selectedFilter === "past" ? "my-bookings-filter-btn-selected" : ""}`}
                                onClick={() => setSelectedFilter("past")}
                            >
                                Past
                            </p>
                        </div>

                        <div>
                            {selectedFilter === "upcoming" ? (
                                upcomingBookings.map((event) => (
                                    <MyBookingCard
                                        key={event._id}
                                        eventPhoto={`http://localhost:3000/event-images/${event.eventDetails.eventPhoto}`}
                                        venue={event.eventDetails.venue}
                                        city={event.eventDetails.city}
                                        date={event.eventDetails.date}
                                        startTime={event.eventDetails.startTime}
                                        endTime={event.eventDetails.endTime}
                                        title={event.eventDetails.title}
                                        seats={event.seats}
                                    />
                                ))
                            ) : (
                                pastBookings.map((event) => (
                                    <MyBookingCard
                                        key={event._id}
                                        eventPhoto={`http://localhost:3000/event-images/${event.eventDetails.eventPhoto}`}
                                        venue={event.eventDetails.venue}
                                        city={event.eventDetails.city}
                                        date={event.eventDetails.date}
                                        startTime={event.eventDetails.startTime}
                                        endTime={event.eventDetails.endTime}
                                        title={event.eventDetails.title}
                                        seats={event.seats}
                                    />
                                ))
                            )}
                        </div>

                    </div>
                </div>

                <div className="my-bookings-footer-div">
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default MyBookings;