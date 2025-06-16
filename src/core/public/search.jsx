import ExplorerNavBar from "../../components/explorer_nav_bar";
import "../css_files/public/search.css";

function Search() {
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search;