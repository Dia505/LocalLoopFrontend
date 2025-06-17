import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/auth_context";
import { useNavigate } from "react-router-dom";

import art from "../../assets/art.png";
import community from "../../assets/community.png";
import dance from "../../assets/dance.png";
import festival from "../../assets/festival.png";
import food from "../../assets/food.png";
import health from "../../assets/health.png";
import market from "../../assets/market.png";
import music from "../../assets/music.png";
import searchIcon from "../../assets/search_icon.png";
import searchImg1 from "../../assets/search_img1.png";
import searchImg2 from "../../assets/search_img2.png";
import sports from "../../assets/sports.png";
import theatre from "../../assets/theatre.png";
import noResultsImg from "../../assets/login.png"
import ExplorerNavBar from "../../components/explorer_nav_bar";
import SearchCategoryFilter from "../../components/search/search_category_filter";
import SearchResult from "../../components/search/search_result";
import "../css_files/public/search.css";

function Search() {
    const [priceType, setPriceType] = useState("");
    const [events, setEvents] = useState([]);
    const authToken = useAuth();

    const [city, setCity] = useState("");
    const [eventType, setEventType] = useState("");

    const [searchQuery, setSearchQuery] = useState("");

    const { query } = useParams();

    const [searchParams] = useSearchParams();
    const categoryFromQuery = searchParams.get("category");
    const locationFromQuery = searchParams.get("location");

    const navigate = useNavigate();

    const handleCheckboxChange = (value) => {
        setPriceType((prev) => (prev === value ? "" : value));
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setCity("");
                setEventType("");
                setPriceType("");

                const response = await axios.get("http://localhost:3000/api/event/home-events");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [authToken]);

    useEffect(() => {
        if (categoryFromQuery) {
            setEventType(categoryFromQuery);
        }
    }, [categoryFromQuery]);

    useEffect(() => {
        if (locationFromQuery) {
            setCity(locationFromQuery);
        }
    }, [locationFromQuery]);

    useEffect(() => {
        const fetchFilteredEvents = async () => {
            try {
                const params = new URLSearchParams();

                if (city) params.append("city", city);
                if (eventType) params.append("eventType", eventType);
                if (priceType) params.append("isPaid", priceType === "Paid");

                const response = await axios.get(`http://localhost:3000/api/event/filter?${params.toString()}`);
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching filtered events:", error);
            }
        };

        if (categoryFromQuery || locationFromQuery || city || eventType || priceType) {
            fetchFilteredEvents();
        }
    }, [city, eventType, priceType]);

    useEffect(() => {
        if (query) {
            setSearchQuery(query);
            handleSearch(query);
        }
    }, [query]);

    const handleSearch = async (customQuery) => {
        const q = (customQuery ?? searchQuery).trim();
        if (!q) return;

        try {
            const response = await axios.get(`http://localhost:3000/api/event/search?query=${encodeURIComponent(q)}`);
            setEvents(response.data);
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    return (
        <>
            <div className="search-main-window">
                <ExplorerNavBar />

                <div className="search-bar-div">
                    <img className="search-img1" src={searchImg1} />

                    <div className="search-bar-texts-div">
                        <p className="search-title">Explore</p>

                        <div className="search-subtitle-div">
                            <p className="search-subtitle">Search, filter, and dive into what’s happening around you.</p>
                        </div>

                        <div>
                            <input
                                className="search-bar"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSearch();
                                }}
                            />
                            <img className="search-icon" src={searchIcon} onClick={handleSearch} />
                        </div>
                    </div>

                    <img className="search-img2" src={searchImg2} />
                </div>

                <div className="search-filter-result-div">
                    <div className="search-filter-div">
                        <p className="search-filter-text">Filters</p>

                        <select className="search-city-filter" value={city} onChange={(e) => setCity(e.target.value)}>
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
                                    categoryImg={music}
                                    category="Music"
                                    selectedCategory={eventType}
                                    onCategorySelect={setEventType}
                                />
                                <SearchCategoryFilter
                                    categoryImg={dance}
                                    category="Dance"
                                    selectedCategory={eventType}
                                    onCategorySelect={setEventType}
                                />
                                <SearchCategoryFilter
                                    categoryImg={art}
                                    category="Art"
                                    selectedCategory={eventType}
                                    onCategorySelect={setEventType}
                                />
                                <SearchCategoryFilter
                                    categoryImg={theatre}
                                    category="Theatre"
                                    selectedCategory={eventType}
                                    onCategorySelect={setEventType}
                                />
                                <SearchCategoryFilter
                                    categoryImg={food}
                                    category="Food & Drinks"
                                    selectedCategory={eventType}
                                    onCategorySelect={setEventType}
                                />
                                <SearchCategoryFilter
                                    categoryImg={market}
                                    category="Market & Pop-ups"
                                    selectedCategory={eventType}
                                    onCategorySelect={setEventType}
                                />
                                <SearchCategoryFilter
                                    categoryImg={community}
                                    category="Community"
                                    selectedCategory={eventType}
                                    onCategorySelect={setEventType}
                                />
                                <SearchCategoryFilter
                                    categoryImg={health}
                                    category="Health & Wellness"
                                    selectedCategory={eventType}
                                    onCategorySelect={setEventType}
                                />
                                <SearchCategoryFilter
                                    categoryImg={festival}
                                    category="Festival"
                                    selectedCategory={eventType}
                                    onCategorySelect={setEventType}
                                />
                                <SearchCategoryFilter
                                    categoryImg={sports}
                                    category="Sports"
                                    selectedCategory={eventType}
                                    onCategorySelect={setEventType}
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
                        {events.length === 0 ? (
                            <div className="no-results-div">
                                <img className="no-results-img" src={noResultsImg} />
                                <p className="no-results-message">Looks like there’s nothing here right now. Try something else!</p>
                            </div>
                        ) : (
                            events.map((event) => (
                                <div onClick={() => navigate(`/event-details/${event._id}`)}>
                                    <SearchResult
                                        key={event._id}
                                        image={`http://localhost:3000/event-images/${event.eventPhoto}`}
                                        venue={event.venue}
                                        city={event.city}
                                        date={event.date}
                                        startTime={event.startTime}
                                        endTime={event.endTime}
                                        title={event.title}
                                        subtitle={event.subtitle}
                                        priceType={event.isPaid}
                                        totalSeats={event.totalSeats}
                                    />
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Search;