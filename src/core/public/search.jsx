import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth_context";

import ExplorerNavBar from "../../components/explorer_nav_bar";
import SearchCategoryFilter from "../../components/search/search_category_filter";
import SearchResult from "../../components/search/search_result";
import "../css_files/public/search.css";

function Search() {
    const [priceType, setPriceType] = useState("");
    const [events, setEvents] = useState([]);
    const authToken = useAuth();

    const handleCheckboxChange = (value) => {
        setPriceType((prev) => (prev === value ? "" : value));
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/event/home-events");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [authToken]);

    return (
        <>
            <div className="search-main-window">
                <ExplorerNavBar />

                <div className="search-bar-div">
                    <img className="search-img1" src="src\assets\search_img1.png" />

                    <div className="search-bar-texts-div">
                        <p className="search-title">Explore</p>

                        <div className="search-subtitle-div">
                            <p className="search-subtitle">Search, filter, and dive into what’s happening around you.</p>
                        </div>

                        <div>
                            <input className="search-bar" />
                            <img className="search-icon" src="src\assets\search_icon.png" />
                        </div>
                    </div>

                    <img className="search-img2" src="src\assets\search_img2.png" />
                </div>

                <div className="search-filter-result-div">
                    <div className="search-filter-div">
                        <p className="search-filter-text">Filters</p>

                        <select className="search-city-filter">
                            <option value="" disabled selected hidden>Select a city</option>
                            <option value="Kathmandu">Kathmandu</option>
                            <option value="Lalitpur">Lalitpur</option>
                            <option value="Bhaktapur">Bhaktapur</option>
                            <option value="Pokhara">Pokhara</option>
                            <option value="Chitwan">Chitwan</option>
                            <option value="Biratnagar">Biratnagar</option>
                            <option value="Birgunj">Birgunj</option>
                            <option value="Butwal">Butwal</option>
                            <option value="Dharan">Dharan</option>
                            <option value="Hetauda">Hetauda</option>
                            <option value="Nepalgunj">Nepalgunj</option>
                            <option value="Dhangadhi">Dhangadhi</option>
                            <option value="Janakpur">Janakpur</option>
                            <option value="Itahari">Itahari</option>
                        </select>

                        <div className="search-cateogry-filter-div">
                            <p className="search-categories-text">Categories</p>

                            <div className="search-category-filter-wrapper">
                                <SearchCategoryFilter
                                    categoryImg="src\assets\music.png"
                                    category="Music"
                                />
                                <SearchCategoryFilter
                                    categoryImg="src\assets\dance.png"
                                    category="Dance"
                                />
                                <SearchCategoryFilter
                                    categoryImg="src\assets\art.png"
                                    category="Art"
                                />
                                <SearchCategoryFilter
                                    categoryImg="src\assets\theatre.png"
                                    category="Theatre"
                                />
                                <SearchCategoryFilter
                                    categoryImg="src\assets\food.png"
                                    category="Food & Drinks"
                                />
                                <SearchCategoryFilter
                                    categoryImg="src\assets\market.png"
                                    category="Market & Pop-ups"
                                />
                                <SearchCategoryFilter
                                    categoryImg="src\assets\community.png"
                                    category="Community"
                                />
                                <SearchCategoryFilter
                                    categoryImg="src\assets\health.png"
                                    category="Health & Wellness"
                                />
                                <SearchCategoryFilter
                                    categoryImg="src\assets\festival.png"
                                    category="Festival"
                                />
                                <SearchCategoryFilter
                                    categoryImg="src\assets\sports.png"
                                    category="Sports"
                                />
                            </div>
                        </div>

                        <div className="search-price-filter-div">
                            <p className="search-categories-text">Price</p>

                            <div className="search-price-filter-wrapper">
                                <label className="checkbox-label-container">
                                    <input
                                        className="price-checkbox-input"
                                        type="checkbox"
                                        checked={priceType === 'Free'}
                                        onChange={() => handleCheckboxChange('Free')}
                                    />
                                    <span className="custom-checkbox-visual"></span>
                                    <p className="checkbox-label-text">Free</p>
                                </label>

                                <label className="checkbox-label-container">
                                    <input
                                        className="price-checkbox-input"
                                        type="checkbox"
                                        checked={priceType === 'Paid'}
                                        onChange={() => handleCheckboxChange('Paid')}
                                    />
                                    <span className="custom-checkbox-visual"></span>
                                    <p className="checkbox-label-text">Paid</p>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="search-results-div">
                        {events.map((event) => (
                            <SearchResult
                                image={`http://localhost:3000/event-images/${event.eventPhoto}`}
                                venue={event.venue}
                                city={event.city}
                                date={event.date}
                                startTime={event.startTime}
                                endTime={event.endTime}
                                title={event.title}
                                subtitle={event.subtitle}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search;