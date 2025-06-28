import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth_context";

import "./css_files/bookmark_icon.css";

function BookmarkIcon({eventId}) {
    const { authToken } = useAuth();
    const [bookmarkedEvents, setBookmarkedEvents] = useState({});

    let userId = null;
    if (authToken) {
        const decoded = jwtDecode(authToken);
        userId = decoded._id || decoded.id;
    }

    const toggleBookmark = (e, eventId) => {
        e.stopPropagation();

        const bookmarkId = bookmarkedEvents[eventId]; // already saved in state

        if (bookmarkId) {
            //UNBOOKMARK
            unbookmarkEvent.mutate(bookmarkId, {
                onSuccess: () => {
                    // Remove from state
                    setBookmarkedEvents(prev => {
                        const updated = { ...prev };
                        delete updated[eventId];
                        return updated;
                    });
                }
            });
        } else {
            //BOOKMARK
            const requestData = {
                eventExplorerId: userId,
                eventId
            };

            bookmarkEvent.mutate(requestData, {
                onSuccess: (response) => {
                    const newBookmarkId = response.data?._id;
                    if (newBookmarkId) {
                        setBookmarkedEvents(prev => ({
                            ...prev,
                            [eventId]: newBookmarkId
                        }));
                    }
                }
            });
        }
    };

    useEffect(() => {
        if (!authToken) return;

        const fetchBookmarks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/bookmark/event-explorer", {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });

                const bookmarks = response.data || [];

                const bookmarksMap = {};
                bookmarks.forEach(bookmark => {
                    const eventId = bookmark.eventId?._id;
                    const bookmarkId = bookmark._id;
                    if (eventId) {
                        bookmarksMap[eventId] = bookmarkId;
                    }
                });

                setBookmarkedEvents(bookmarksMap);

            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            }
        };

        fetchBookmarks();
    }, [authToken]);

    const bookmarkEvent = useMutation({
        mutationKey: "SAVEDATA",
        mutationFn: ({ eventExplorerId, eventId }) => {
            return axios.post(
                "http://localhost:3000/api/bookmark",
                { eventExplorerId, eventId },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );
        },
        onSuccess: () => toast.success("Event bookmarked", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
        })
    });

    const unbookmarkEvent = useMutation({
        mutationKey: "UNSAVEDATA",
        mutationFn: (bookmarkId) => {
            return axios.delete(`http://localhost:3000/api/bookmark/${bookmarkId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        },
        onSuccess: () => toast.success("Bookmark removed", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
        })
    });

    return (
        <>
            <span
                className={`material-symbols-outlined bookmark-icon ${bookmarkedEvents[eventId] ? "active" : ""}`}
                onClick={(e) => toggleBookmark(e, eventId)}
            >
                bookmark
            </span>
        </>
    )
}

export default BookmarkIcon;