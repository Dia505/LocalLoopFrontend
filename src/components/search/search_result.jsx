import "../css_files/search/search_result.css";

function SearchResult({image, venue, city, date, startTime, endTime, title, subtitle, priceType}) {
    return(
        <>
            <div className="search-result-main-div">
                <img className="search-result-img" src={image}/>

                <div className="search-result-details-div">
                    <div className="search-result-details-first-layer">
                        <div className="search-result-icon-detail-div">
                            <img className="search-result-icon" src="src\assets\grey_location.png" />
                            <p className="search-result-detail">{venue}, {city}</p>
                        </div>

                        <div className="search-result-icon-detail-div">
                            <img className="search-result-icon" src="src\assets\grey_calendar.png" />
                            <p className="search-result-detail">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>

                        <div className="search-result-icon-detail-div">
                            <img className="search-result-icon" src="src\assets\grey_clock.png" />
                            <p className="search-result-detail">{endTime
                                ? `${startTime} - ${endTime}`
                                : `${startTime} onwards`}</p>
                        </div>
                    </div>

                    <div className="search-result-details-second-layer">
                        <p className="search-result-title">{title}</p>
                        <div className="search-result-subtitle-div">
                            <p className="search-result-subtitle">{subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchResult;