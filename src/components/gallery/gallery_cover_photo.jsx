import { useNavigate } from "react-router-dom";
import "../css_files/gallery/gallery_cover_photo.css";

function GalleryCoverPhoto({ coverPhoto, eventTitle, galleryId }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="gallery-cover-photo-div">
                <img className="gallery-cover-img" src={`http://localhost:3000/gallery-cover-images/${coverPhoto}`} />

                <div className="gallery-cover-overlay">
                    <div className="gallery-cover-title-btn-div">
                        <p className="gallery-cover-title">{eventTitle}</p>
                        <button className="gallery-cover-btn" onClick={() => navigate(`../event-gallery/${galleryId}`)}>See more</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GalleryCoverPhoto;