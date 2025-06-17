import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ExplorerNavBar from "../../components/explorer_nav_bar";
import Footer from "../../components/footer";
import HomeAboutSlideshow from "../../components/home/home_about_slideshow";
import HomeCategoryFilter from "../../components/home/home_category_filter";
import HomeTestimonialsSlideshow from "../../components/home/home_testimonials_slideshow";
import UpcomingEventCard from "../../components/home/upcoming_event_card";
import HomeLocation from "../../components/home/home_location";
import "../css_files/public/home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>
            <div className="home-main-window">
                <ExplorerNavBar />

                <div className="slideshow">
                    <img src="src\assets\slideshow1.jpg" className="slide" />
                    <img src="src\assets\slideshow2.png" className="slide" />
                    <img src="src\assets\slideshow3.jpg" className="slide" />
                    <img src="src\assets\slideshow4.jpg" className="slide" />
                    <img src="src\assets\slideshow5.jpg" className="slide" />
                </div>

                <div className="slideshow-components-div">
                    <div className="slideshow-title-div">
                        <p className="slideshow-title">Loop into your city’s hidden gems</p>
                    </div>

                    <div className="slideshow-subtitle-div">
                        <p className="slideshow-subtitle">Discover unique events, pop-ups, and moments worth showing up for</p>
                    </div>

                    <div className="slideshow-search-bar-div">
                        <input
                            className="slideshow-search-bar"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSearch();
                            }}
                        />
                        <img className="home-search-icon" src="src\assets\search_icon.png" onClick={handleSearch}/>
                    </div>
                </div>

                <HomeCategoryFilter />

                <div className="home-upcoming-events-div">
                    <p className="home-upcoming-events-text">Upcoming events</p>
                    <UpcomingEventCard />
                </div>

                <div className="home-location-filter-div">
                    <div className="home-location-filter-title-div">
                        <p className="home-location-filter-title">Search by cities</p>
                        <img className="home-location-filter-gif" src="src\assets\home_location_filter.gif" />
                    </div>

                    <div className="home-locations-div">
                        <HomeLocation location="Kathmandu"/>
                        <HomeLocation location="Chitwan"/>
                        <HomeLocation location="Dharan"/>
                        <HomeLocation location="Janakpur"/>
                        <HomeLocation location="Lalitpur"/>
                        <HomeLocation location="Biratnagar"/>
                        <HomeLocation location="Hetauda"/>
                        <HomeLocation location="Itahari"/>
                        <HomeLocation location="Bhaktapur"/>
                        <HomeLocation location="Birgunj"/>
                        <HomeLocation location="Nepalgunj"/>
                        <HomeLocation location="Pokhara"/>
                        <HomeLocation location="Butwal"/>
                        <HomeLocation location="Dhangadhi"/>
                    </div>
                </div>

                <div className="home-about-gallery-div">
                    <img className="home-about-gallery-bg" src="src\assets\home_about_bg.png" />

                    <div className="home-about-gallery-components">
                        <div className="home-about-div">

                            <div className="home-about-title-div">
                                <p className="home-about-title">Why LocalLoop Stands Out</p>
                                <img className="home-about-sparkle" src="src\assets\sparkle.png" />
                            </div>

                            <HomeAboutSlideshow />
                        </div>

                        <div className="home-gallery-div">
                            <div className="home-gallery-texts">
                                <div className="home-gallery-title-div">
                                    <p className="home-gallery-title">A glimpse of the magic we’ve shared</p>
                                </div>
                                <p className="home-gallery-subtitle">Real people, real moments, real fun.</p>
                                <button className="home-gallery-btn">
                                    <span className="gradient-text">See more in Gallery</span>
                                </button>
                            </div>

                            <div className="home-gallery-imgs-div">
                                <img className="home_gallery_img" src="src\assets\home_gallery1.jpeg" />

                                <div className="home-gallery-imgs-inner-div">
                                    <img className="home_gallery_img" src="src\assets\home_gallery2.jpeg" />
                                    <img className="home_gallery_img" src="src\assets\home_gallery4.jpg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="home-testimonials-div">
                    <div className="home-testimonials-text-div">
                        <p className="home-testimonials-title">Testimonials</p>
                        <div className="home-testimonials-subtitle-div">
                            <p className="home-testimonials-subtitle">Shared moments from those who’ve explored, hosted, and loved it.</p>
                        </div>
                    </div>

                    <HomeTestimonialsSlideshow />
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Home;