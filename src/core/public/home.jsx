import ExplorerNavBar from "../../components/explorer_nav_bar";
import "../css_files/public/home.css";
import HomeCategoryFilter from "../../components/home/home_category_filter";
import UpcomingEventCard from "../../components/home/upcoming_event_card";

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
                        <input className="slideshow-search-bar"/>
                        <img className="home-search-icon" src="src\assets\search_icon.png"/>
                    </div>
                </div>

                <HomeCategoryFilter/>

                <div className="home-upcoming-events-div">
                    <p className="home-upcoming-events-text">Upcoming events</p>
                    <UpcomingEventCard/>
                </div>

                <div className="home-location-filter-div">
                    <div className="home-location-filter-title-div"> 
                        <p className="home-location-filter-title">Search by cities</p>
                        <img className="home-location-filter-gif" src="src\assets\home_location_filter.gif"/>
                    </div>

                    <div className="home-locations-div">
                        <p>Kathmandu</p>
                        <p>Chitwan</p>
                        <p>Dharan</p>
                        <p>Janakpur</p>
                        <p>Lalitpur</p>
                        <p>Biratnagar</p>
                        <p>Hetauda</p>
                        <p>Itahari</p>
                        <p>Bhaktapur</p>
                        <p>Birgunj</p>
                        <p>Nepalgunj</p>
                        <p>Pokhara</p>
                        <p>Butwal</p>
                        <p>Dhangadhi</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;