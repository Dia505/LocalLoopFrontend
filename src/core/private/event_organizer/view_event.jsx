import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import editIcon from "../../../assets/edit.png";
import OrganizerSideBar from "../../../components/navigation/organizer_side_bar";
import "../../css_files/private/view_event.css";

function ViewEvent() {
    const { _id } = useParams();
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState([]);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoPlay = () => {
        videoRef.current.play();
        setIsPlaying(true);
    };

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/event/${_id}`);
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };
        fetchEventDetails();
    }, [_id]);

    useEffect(() => {
        if (event && event.isPaid) {
            const fetchTicketDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/ticket/event/${_id}`);
                    setTickets(response.data);
                } catch (error) {
                    console.error("Error fetching tickets:", error);
                }
            };
            fetchTicketDetails();
        }
    }, [_id, event]);

    return (
        <>
            <div className="view-event-main-window">
                <OrganizerSideBar />

                <div className="view-event-main-div">
                    <img
                        className="view-event-img"
                        src={`http://localhost:3000/event-images/${event?.eventPhoto}`}
                    />
                    <div className="view-event-title-edit-div">
                        <p className="view-event-title">Event details</p>
                        <img src={editIcon} className="view-event-edit-icon" />
                    </div>

                    {event?.eventVideo.length > 0 && (
                        <div className="video-container">
                            <video
                                ref={videoRef}
                                src={`http://localhost:3000/event-videos/${event.eventVideo[0]}`}
                                className="custom-video"
                                controls={isPlaying}
                            />
                            {!isPlaying && (
                                <div className="video-overlay" onClick={handleVideoPlay}>
                                    <button className="play-button">▶</button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="view-event-details-div">
                        <div className="view-event-details">
                            <div>
                                <p className="view-event-detail-title">Title</p>
                                <p>{event?.title}</p>
                            </div>

                            <div>
                                <p className="view-event-detail-title">Subtitle</p>
                                <div className="view-event-subtitle-div">
                                    <p>{event?.subtitle}</p>
                                </div>
                            </div>
                        </div>

                        <div className="view-event-details">
                            <div>
                                <p className="view-event-detail-title">Venue</p>
                                <p>{event?.venue}</p>
                            </div>

                            <div>
                                <p className="view-event-detail-title">Address</p>
                                <p>{event?.address}</p>
                            </div>

                            <div>
                                <p className="view-event-detail-title">City</p>
                                <p>{event?.city}</p>
                            </div>
                        </div>

                        <div className="view-event-details">
                            <div>
                                <p className="view-event-detail-title">Date</p>
                                <p>{new Date(event?.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>

                            <div>
                                <p className="view-event-detail-title">Time</p>
                                <p>{event?.endTime
                                    ? `${event?.startTime} - ${event?.endTime}`
                                    : `${event?.startTime} onwards`}</p>
                            </div>

                            {event?.totalSeats && (
                                <div>
                                    <p className="view-event-detail-title">Total seats</p>
                                    <p>{event?.totalSeats}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="view-event-title-edit-div">
                        <p className="view-event-title">Ticket details</p>
                        <img src={editIcon} className="view-event-edit-icon" />
                    </div>

                    <div>
                        
                    </div>

                    {tickets.length > 0 && (
                        <div className="view-event-title-edit-div">
                            <p className="view-event-title">Ticket details</p>
                            <img src={editIcon} className="view-event-edit-icon" />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ViewEvent;