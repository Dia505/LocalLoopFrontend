import ExplorerNavBar from "../../components/explorer_nav_bar";
import "../css_files/public/home.css";

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
            </div>
        </>
    )
}

export default Home;