import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth_context";

import OrganizerSideBar from "../../../components/navigation/organizer_side_bar";
import UpcomingEventsSlideshow from "../../../components/dashboard/upcoming_events_slideshow";
import OrganizerFooter from "../../../components/organizer_footer";
import "../../css_files/private/dashboard.css";

function Dashboard() {
    const { authToken } = useAuth();
    const [organizer, setOrganizer] = useState(null);
    const [activeEventsCount, setActiveEventsCount] = useState(0);
    const [totalActiveEventTicketsCount, setTotalActiveEventTicketsCount] = useState(0);
    const [totalActiveEventBookingCount, setTotalActiveEventBookingCount] = useState(0);

    const decoded = jwtDecode(authToken);
    const organizerId = decoded._id || decoded.id;

    useEffect(() => {
        const fetchOrganizerDetails = async () => {
            try {
                if (!authToken) return;

                const response = await axios.get(
                    `http://localhost:3000/api/event-organizer/${organizerId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                setOrganizer(response.data);
            } catch (error) {
                console.error("Error fetching organizer details:", error);
            }
        };

        fetchOrganizerDetails();
    }, [authToken]);

    useEffect(() => {
        const fetchActiveEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/event/event-organizer/${organizerId}`);
                const allEvents = response.data;

                const now = new Date();
                const upcomingEvents = allEvents.filter(event => new Date(event.date) >= now);

                setActiveEventsCount(upcomingEvents.length);
            } catch (error) {
                console.error("Failed to fetch active events:", error);
            }
        };

        fetchActiveEvents();
    }, [organizerId]);

    useEffect(() => {
        const fetchTotalTicketsOfActiveEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/ticket/upcoming-events/total-tickets/${organizerId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                setTotalActiveEventTicketsCount(response.data.totalTicketsSold);
            }
            catch (error) {
                console.error("Error fetching total tickets of active events:", error);
            }
        };

        fetchTotalTicketsOfActiveEvents();
    }, [organizerId]);

    useEffect(() => {
        const fetchTotalBookingsOfActiveEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/booking/upcoming-events/total-bookings/${organizerId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                setTotalActiveEventBookingCount(response.data.totalSeatsBooked);
            }
            catch (error) {
                console.error("Error fetching total bookings of active events:", error);
            }
        };

        fetchTotalBookingsOfActiveEvents();
    }, [organizerId]);

    return (
        <>
            <div className="dashboard-main-window">
                <OrganizerSideBar />

                <div className="dashboard-main-div">
                    <p className="dashboard-title">Dashboard</p>

                    <div className="dashboard-organizer-create-btn-div">
                        <div>
                            <div className="dashboard-welcome-back-div">
                                <p className="dashboard-welcome-back-text">Welcome back</p>
                                <p>👋</p>
                            </div>
                            <p className="dashboard-organizer-name">{organizer?.fullName}</p>
                        </div>

                        <button className="dashboard-create-event-btn">Create event +</button>
                    </div>

                    <div className="dashboard-insights-div">
                        <div className="dashboard-insight">
                            <p className="dashboard-insight-title">Total active events</p>
                            <p className="dashboard-insight-stats">{activeEventsCount}</p>
                        </div>
                        <div className="dashboard-insight">
                            <p className="dashboard-insight-title">Active event ticket sales</p>
                            <p className="dashboard-insight-stats">{totalActiveEventTicketsCount}</p>
                        </div>
                        <div className="dashboard-insight">
                            <p className="dashboard-insight-title">Active event bookings</p>
                            <p className="dashboard-insight-stats">{totalActiveEventBookingCount}</p>
                        </div>
                    </div>

                    <UpcomingEventsSlideshow/>

                    <OrganizerFooter/>
                </div>
            </div>
        </>
    )
}

export default Dashboard;