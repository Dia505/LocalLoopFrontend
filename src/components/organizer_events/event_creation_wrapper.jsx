import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth_context";
import { useNavigate } from "react-router-dom";

import CreateEventForm from "./create_event_form";
import TicketDetailsForm from "./ticket_details_form";

function EventCreationWrapper({ closeForm }) {
    const [step, setStep] = useState("create-event");

    // Step 1: Store values
    const [eventData, setEventData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [ticketDetailsData, setTicketDetailsData] = useState([]);

    const { authToken } = useAuth();
    const navigate = useNavigate();

    // Step 2: From CreateEventForm, move to tickets (for paid events)
    const handleGoToTickets = (data, image, video) => {
        setEventData(data);
        setSelectedFile(image);
        setVideoFile(video);
        setStep("ticket-details");
    };

    const handleBackToEventForm = () => {
        setStep("create-event");
    };

    const handleTicketsSubmit = async (tickets) => {
        console.log("Submitting ticket and event: ", tickets);
        try {
            const formData = new FormData();
            const data = eventData;

            formData.append("title", data.title);
            formData.append("subtitle", data.subtitle);
            formData.append("eventType", data.eventType);
            formData.append("venue", data.venue);
            formData.append("address", data.address);
            formData.append("city", data.city);
            formData.append("date", new Date(data.date).toISOString());
            formData.append("startTime", data.startTime);
            if (data.endTime) formData.append("endTime", data.endTime);
            formData.append("isPaid", "true");

            if (selectedFile) formData.append("eventPhoto", selectedFile);
            if (videoFile) formData.append("eventVideo", videoFile);

            // Submit event
            const eventResponse = await axios.post("http://localhost:3000/api/event", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${authToken}`,
                },
            });

            const eventId = eventResponse.data._id;

            // Submit each ticket
            for (let ticket of tickets) {
                await axios.post("http://localhost:3000/api/ticket", {
                    ...ticket,
                    eventId,
                }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
            }

            toast.success("Event and tickets created successfully!");
            closeForm();
            navigate(`/view-event/${eventId}`);
        } catch (err) {
            console.error("Error submitting event and tickets:", err);
            toast.error("Failed to create event and tickets.");
        }
    };

    return (
        <>
            {step === "create-event" && (
                <CreateEventForm
                    defaultValues={eventData}
                    onNext={handleGoToTickets}
                    closeForm={closeForm}
                />
            )}

            {step === "ticket-details" && (
                <TicketDetailsForm
                    defaultValues={ticketDetailsData}
                    onBack={handleBackToEventForm}
                    onSubmit={handleTicketsSubmit}
                />
            )}
        </>
    );
}

export default EventCreationWrapper;
