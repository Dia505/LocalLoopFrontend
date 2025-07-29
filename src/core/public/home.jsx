import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/footer";
import HomeAboutSlideshow from "../../components/home/home_about_slideshow";
import HomeCategoryFilter from "../../components/home/home_category_filter";
import HomeFaq from "../../components/home/home_faq";
import HomeLocation from "../../components/home/home_location";
import HomeTestimonialsSlideshow from "../../components/home/home_testimonials_slideshow";
import UpcomingEventCard from "../../components/home/upcoming_event_card";
import ExplorerNavBar from "../../components/navigation/explorer_nav_bar";
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
                        <img className="home-search-icon" src="src\assets\search_icon.png" onClick={handleSearch} />
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
                        <HomeLocation location="Kathmandu" />
                        <HomeLocation location="Chitwan" />
                        <HomeLocation location="Dharan" />
                        <HomeLocation location="Janakpur" />
                        <HomeLocation location="Lalitpur" />
                        <HomeLocation location="Biratnagar" />
                        <HomeLocation location="Hetauda" />
                        <HomeLocation location="Itahari" />
                        <HomeLocation location="Bhaktapur" />
                        <HomeLocation location="Birgunj" />
                        <HomeLocation location="Nepalgunj" />
                        <HomeLocation location="Pokhara" />
                        <HomeLocation location="Butwal" />
                        <HomeLocation location="Dhangadhi" />
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

                                <div className="home-gallery-imgs-small-screen-div">
                                    <img className="home_gallery_img" src="src\assets\home_gallery1.jpeg" />
                                    <img className="home_gallery_img" src="src\assets\home_gallery2.jpeg" />
                                    <img className="home_gallery_img" src="src\assets\home_gallery4.jpg" />
                                </div>

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

                <div className="home-faq-div">
                    <p className="home-testimonials-title">Frequently Asked Questions</p>

                    <div className="home-faq-list">
                        <HomeFaq question="How do I find events near me?"
                            answer="You can browse events by location, date, or category using our search and filter options on the homepage. 
                            Events closest to your current location will be shown first."
                        />

                        <HomeFaq question="How can I create and publish my event?"
                            answer="After signing up as an organizer, go to your dashboard and click “Create Event.” Fill in the event details, set ticket pricing, and publish it instantly."
                        />

                        <HomeFaq question="Do I need an account to buy tickets?"
                            answer="Yes, you’ll need to create a free account to buy tickets, book seats or save interested events."
                        />

                        <HomeFaq question=" Can I manage ticket sales and attendee lists from the platform?"
                            answer="Yes. You can track ticket sales in real time and monitor event performance through your dashboard."
                        />

                        <HomeFaq question="Is it safe to purchase tickets through LocalLoop?"
                            answer="Absolutely. All payments are processed securely, and we work closely with verified organizers to ensure legitimacy."
                        />

                        <HomeFaq question="Are there any fees for hosting an event on LocalLoop?"
                            answer="LocalLoop charges a small service fee per ticket sold. There are no upfront costs to list your event. For more details, feel free to reach out; our contact information is available on the Contact page."
                        />

                        <HomeFaq question="Can I cancel my ticket and get a refund?"
                            answer="Refund policies are set by each event organizer. If you need a refund, please reach out to us via the Contact page; we’ll connect you with the organizer to discuss your request."
                        />
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Home;