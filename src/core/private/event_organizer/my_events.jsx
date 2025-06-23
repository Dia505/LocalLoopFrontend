import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth_context";

import noEvents from "../../../assets/no_events.png";
import OrganizerSideBar from "../../../components/navigation/organizer_side_bar";
import ArchivedEventCard from "../../../components/organizer_events/archived_event_card";
import UpcomingEventCard from "../../../components/organizer_events/upcoming_event_card";
import OrganizerFooter from "../../../components/organizer_footer";
import CreateEventForm from "../../../components/organizer_events/create_event_form";
import "../../css_files/private/my_events.css";

function MyEvents() {
    const [myEvents, setMyEvents] = useState([]);
    const [archivedEvents, setArchivedEvents] = useState([]);
    const { authToken } = useAuth();
    const [selectedFilter, setSelectedFilter] = useState("upcoming");
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);

    const decoded = jwtDecode(authToken);
    const organizerId = decoded._id || decoded.id;

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/event/event-organizer/${organizerId}`);
                const allEvents = response.data;

                const now = new Date();
                const upcomingEvents = allEvents.filter(event => new Date(event.date) >= now);
                const pastEvents = allEvents.filter(event => new Date(event.date) < now);

                setMyEvents(upcomingEvents);
                setArchivedEvents(pastEvents);
            } catch (error) {
                console.error("Failed to fetch organizer's events:", error);
            }
        };

        fetchUpcomingEvents();
    }, [organizerId]);

    return (
        <>
            <div className="my-events-main-window">
                <OrganizerSideBar />

                <div className="my-events-main-div">
                    <div className="my-events-title-create-div">
                        <p className="my-events-title">My Events</p>
                        <button className="my-events-create-event-btn" onClick={() => setShowCreateEventForm(true)}>Create event +</button>
                    </div>

                    <div className="my-events-filter-div">
                        <p
                            className={`my-events-filter-btn ${selectedFilter === "upcoming" ? "my-events-filter-btn-selected" : ""}`}
                            onClick={() => setSelectedFilter("upcoming")}
                        >
                            Upcoming
                        </p>

                        <p
                            className={`my-events-filter-btn ${selectedFilter === "archived" ? "my-events-filter-btn-selected" : ""}`}
                            onClick={() => setSelectedFilter("archived")}
                        >
                            Archived
                        </p>
                    </div>

                    <div className="my-events-grid">
                        {selectedFilter === "upcoming" ? (

                            myEvents.length > 0 ? (
                                myEvents.map((event) => (
                                    <UpcomingEventCard
                                        key={event._id}
                                        eventPhoto={event.eventPhoto}
                                        title={event.title}
                                        date={event.date}
                                        startTime={event.startTime}
                                        endTime={event.endTime}
                                        venue={event.venue}
                                        city={event.city}
                                        isPaid={event.isPaid}
                                        totalSeats={event.totalSeats}
                                    />
                                ))
                            ) :
                                (
                                    <div className="no-events-div">
                                        <img className="no-events-img" src={noEvents} />
                                        <p className="no-event-text">You haven’t posted any events yet.
                                            Start by creating your first event to engage your audience!</p>
                                    </div>

                                )

                        ) : (
                            archivedEvents.map((event) => (
                                <ArchivedEventCard
                                    key={event._id}
                                    eventPhoto={event.eventPhoto}
                                    title={event.title}
                                    date={event.date}
                                    startTime={event.startTime}
                                    endTime={event.endTime}
                                    venue={event.venue}
                                    city={event.city}
                                    isPaid={event.isPaid}
                                    totalSeats={event.totalSeats}
                                    archivedDate={event.archivedDate}
                                />
                            ))
                        )}
                    </div>

                    <OrganizerFooter />

                    {showCreateEventForm && (
                        <>
                            <div className="my-events-overlay" onClick={() => setShowCreateEventForm(false)}></div>
                            <div className="my-events-form-modal">
                                <CreateEventForm/>
                            </div>
                        </>
                        
                    )}
                </div>
            </div>
        </>
    )
}

export default MyEvents;