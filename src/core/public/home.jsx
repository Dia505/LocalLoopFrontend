import ExplorerNavBar from "../../components/explorer_nav_bar";
import HomeCategoryFilter from "../../components/home/home_category_filter";
import UpcomingEventCard from "../../components/home/upcoming_event_card";
import "../css_files/public/home.css";
import HomeAboutSlideshow from "../../components/home/home_about_slideshow";

function Home() {
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
                        <input className="slideshow-search-bar" />
                        <img className="home-search-icon" src="src\assets\search_icon.png" />
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
                        <div className="home-location-sparkle-div">
                            <p>Kathmandu</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Chitwan</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Dharan</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Janakpur</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Lalitpur</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Biratnagar</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Hetauda</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Itahari</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Bhaktapur</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Birgunj</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Nepalgunj</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Pokhara</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Butwal</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>

                        <div className="home-location-sparkle-div">
                            <p>Dhangadhi</p>
                            <div className="sparkle-wrapper">
                                <img className="home-sparkle" src="src\assets\giphy.gif" />
                            </div>
                        </div>
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

                            <HomeAboutSlideshow/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;