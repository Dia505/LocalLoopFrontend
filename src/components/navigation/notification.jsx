import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth_context";
import "../css_files/navigation/notification.css";

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const { authToken } = useAuth();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/bookmark/pending-notifications", {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setNotifications(response.data);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            }
        };

        if (authToken) fetchNotifications();
    }, [authToken]);

    const markRead = async (bookmarkId, type) => {
        try {
            await axios.put("http://localhost:3000/api/bookmark/mark-notification-read", {
                bookmarkId,
                notificationType: type,
            }, {
                headers: { Authorization: `Bearer ${authToken}` }
            });

            setNotifications(notifications.filter(n => n._id !== bookmarkId)); // remove from UI
        } catch (error) {
            console.error("Failed to mark notification read", error);
        }
    };

    return (
        <>
            <div className="notifications-div">
                {notifications.length === 0 ? (
                    <div className="no-notifications-div">
                        <p>No notifications</p>
                    </div>
                ) : (
                    notifications.map((notif, id) => {

                        const now = new Date();
                        const eventDate = new Date(notif.eventId.date);

                        const diff = eventDate - now;

                        const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
                        const diffHours = Math.floor(diff / (1000 * 60 * 60));

                        // Determine the display string
                        let timeLeft = "";
                        if (diffDays === 5) {
                            timeLeft = "5 days";
                        } else if (diffHours === 24) {
                            timeLeft = "24 hours";
                        } else {
                            // fallback or display something else if needed
                            timeLeft = diffDays > 0 ? `${diffDays} days` : `${diffHours} hours`;
                        }

                        return (
                            <div key={id} className="notification-main-div" onClick={() => {
                                if (notif.notifiedFiveDaysBefore) {
                                    markRead(notif._id, "fiveDays");
                                } else if (notif.notifiedOneDayBefore) {
                                    markRead(notif._id, "oneDay");
                                }
                            }}>
                                <div className="notification-date-div">
                                    <p className="notification-date">{new Date().toLocaleDateString('en-GB', options)}</p>
                                    <div className="notification-date-dot"></div>
                                </div>

                                <div className="notification-details-div">
                                    <img className="notification-organizer-img" src={notif.eventId.eventOrganizerId.profilePicture} />

                                    <div className="notification-title-subtitle-div">
                                        <p className="notification-title">"{notif.eventId.title}" is almost here!</p>
                                        <p className="notification-subtitle">Just {timeLeft} to go. Make sure it’s still on your calendar — you won’t want to miss this one.</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </>
    )
}

export default Notification;