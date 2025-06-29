import "../css_files/public/gallery.css"
import ExplorerNavBar from "../../components/navigation/explorer_nav_bar";
import { useEffect, useState } from "react";
import axios from "axios";
import GalleryCoverPhoto from "../../components/gallery/gallery_cover_photo";
import Footer from "../../components/footer";

function Gallery() {
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/gallery");
                setGallery(response.data);
            } catch (error) {
                console.error("Error fetching gallery:", error);
            }
        };
        fetchGallery();
    }, []);

    return(
        <>
            <div className="gallery-main-window">
                <ExplorerNavBar/>

                <div className="gallery-main-section">
                    <div className="gallery-title-subtitle-div">
                        <p className="gallery-title">Event Gallery</p>

                        <div className="gallery-subtitle-div">
                            <p>Scroll through snapshots from events that brought people together — the music, the laughter, the vibe. See what LocalLoop is all about.</p>
                        </div>
                    </div>

                    <div className="gallery-grid">
                        {gallery.map((event) => (
                            <GalleryCoverPhoto 
                                key={event._id}   
                                coverPhoto={event.coverPhoto}
                                eventTitle={event.eventTitle}
                                galleryId={event._id}
                            />
                        ))}
                    </div>
                </div>

                <Footer/>
            </div>
        </>
    )
}

export default Gallery;