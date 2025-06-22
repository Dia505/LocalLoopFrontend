import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import UpcomingEventCard from "../organizer_events/upcoming_event_card";
import { useAuth } from "../../context/auth_context";

import "../css_files/dashboard/upcoming_events_slideshow.css";

function UpcomingEventsSlideshow() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const {authToken} = useAuth();

    const decoded = jwtDecode(authToken);
    const organizerId = decoded._id || decoded.id;

    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/event/event-organizer/${organizerId}`);
                const allEvents = response.data;

                const now = new Date();
                const upcomingEvents = allEvents.filter(event => new Date(event.date) >= now);

                const grouped = chunkArray(upcomingEvents, 2);
                setUpcomingEvents(grouped);
            } catch (error) {
                console.error("Failed to fetch active events:", error);
            }
        };

        fetchUpcomingEvents();
    }, [organizerId]);

    return (
        <>
            <div className="upcoming-slideshow-main-div">
                <p className="upcoming-slideshow-text">Upcoming events</p>

                <div className="upcoming-slideshow-slide">
                    {upcomingEvents.length > 0 && upcomingEvents[currentSlide]?.map(event => (
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
                    ))}
                </div>

                <div className="upcoming-slideshow-dots">
                    {upcomingEvents.map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === currentSlide ? "active" : ""}`}
                            onClick={() => setCurrentSlide(i)}
                        ></span>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UpcomingEventsSlideshow;