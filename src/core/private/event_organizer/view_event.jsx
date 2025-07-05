import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/auth_context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import editIcon from "../../../assets/edit.png";
import ticketIcon from "../../../assets/ticket.png";
import OrganizerSideBar from "../../../components/navigation/organizer_side_bar";
import "../../css_files/private/view_event.css";
import deleteIcon from "../../../assets/delete.png";
import TicketDetailsEditForm from "../../../components/organizer_events/ticket_details_edit_form";
import EventEditForm from "../../../components/organizer_events/event_edit_form";

function ViewEvent() {
    const { _id } = useParams();
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState([]);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showDeleteEventPopUp, setShowDeleteEventPopUp] = useState(false);
    const { authToken } = useAuth();
    const navigate = useNavigate();
    const [showTicketEditForm, setShowTicketEditForm] = useState(false);
    const [showEventEditForm, setShowEventEditForm] = useState(false);

    useEffect(() => {
        if (showDeleteEventPopUp) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showDeleteEventPopUp]);

    const handleVideoPlay = () => {
        videoRef.current.play();
        setIsPlaying(true);
    };

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

    const handleDeleteEvent = async () => {
    try {
        await axios.delete(`http://localhost:3000/api/event/${event._id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        });

        toast.success("Event deleted successfully!");
        setShowDeleteEventPopUp(false);
        navigate("/my-events"); 

    } catch (error) {
        console.error("Failed to delete event:", error);
        toast.error("Failed to delete event. Try again.");
    }
};

    return (
        <>
            <div className="view-event-main-window">
                <div className="view-event-side-bar">
                    <OrganizerSideBar />
                </div>

                <div className="view-event-main-div">
                    <img
                        className="view-event-img"
                        src={`http://localhost:3000/event-images/${event?.eventPhoto}`}
                    />
                    <div className="view-event-title-edit-div">
                        <p className="view-event-title">Event details</p>
                        <img onClick={() => setShowEventEditForm(true)} src={editIcon} className="view-event-edit-icon" />
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
                                    ? `${formatTo12Hour(event?.startTime)} - ${formatTo12Hour(event?.endTime)}`
                                    : `${formatTo12Hour(event?.startTime)} onwards`}</p>
                            </div>

                            {event?.totalSeats && (
                                <div>
                                    <p className="view-event-detail-title">Total seats</p>
                                    <p>{event?.totalSeats}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {tickets.length > 0 && (
                        <div>
                            <div className="view-event-title-edit-div">
                                <p className="view-event-title">Ticket details</p>
                                <img src={editIcon} onClick={() => setShowTicketEditForm(true)} className="view-event-edit-icon" />
                            </div>

                            <div className="view-event-ticket-details-div">
                                {tickets.map((event, index) => (
                                    <div className="view-event-ticket-details-div" key={index}>
                                        <div className="view-event-ticket-detail-container">
                                            <p className="view-event-ticket-type">{index + 1}. {event.ticketType}</p>
                                            <p><span className="view-event-ticket-topic">Price:</span> Rs. {event.ticketPrice}</p>
                                            <div className="view-event-ticket-quantity-icon-div">
                                                <p><span className="view-event-ticket-topic">Total tickets:</span> {event.ticketQuantity}</p>
                                                <img src={ticketIcon} className="view-event-ticket-icon" />
                                            </div>
                                            <p><span className="view-event-ticket-topic">Sold:</span> {event.sold}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}

                    <button className="view-event-delete-btn" onClick={() => setShowDeleteEventPopUp(true)}>Delete event</button>

                    {showDeleteEventPopUp && (
                        <>
                            <div className="view-event-overlay" onClick={() => setShowDeleteEventPopUp(false)}></div>
                            <div className="view-event-delete-form-modal">
                                <div className="view-event-delete-pop-up">
                                    <img src={deleteIcon} className="view-event-delete-icon"/>
                                    <p className="view-event-delete-title">Delete Event</p>
                                    
                                    <div className="view-event-subtitle-div">
                                        <p>You’re going to delete “{event?.title}” event. Are you sure? </p>
                                    </div>

                                    <div className="view-event-delete-pop-up-btns">
                                        <button type='button' className='delete-pop-up-cancel-btn' onClick={() => setShowDeleteEventPopUp(false)}>No, keep it</button>
                                        <button type='button' className='delete-pop-up-delete-btn' onClick={handleDeleteEvent}>Yes, delete</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {showTicketEditForm && (
                        <>
                            <div className="view-event-overlay" onClick={() => setShowTicketEditForm(false)}></div>
                            <div className="view-event-form-modal">
                                <TicketDetailsEditForm tickets={tickets} eventId={event?._id} closeForm={() => setShowTicketEditForm(false)}/>
                            </div>
                        </>
                    )}

                    {showEventEditForm && (
                        <>
                            <div className="view-event-overlay" onClick={() => setShowEventEditForm(false)}></div>
                            <div className="view-event-form-modal2">
                                <EventEditForm event={event} closeForm={() => setShowEventEditForm(false)}/>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default ViewEvent;