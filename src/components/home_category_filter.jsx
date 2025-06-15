import "./css_files/home_category_filter.css";
import HomeCategory from "./home_category";

function HomeCategoryFilter() {
    return (
        <>
            <div className="home-cat-filter-main-div">
                <div className="home-categories-scroll-wrapper">
                    <div className="home-categories-div">
                        <HomeCategory
                            category_img="src\assets\music.png"
                            category="Music"
                        />
                        <HomeCategory
                            category_img="src\assets\dance.png"
                            category="Dance"
                        />
                        <HomeCategory
                            category_img="src\assets\art.png"
                            category="Art"
                        />
                        <HomeCategory
                            category_img="src\assets\theatre.png"
                            category="Theatre"
                        />
                        <HomeCategory
                            category_img="src\assets\food.png"
                            category="Food & Drinks"
                        />
                        <HomeCategory
                            category_img="src\assets\market.png"
                            category="Market & Pop-ups"
                        />
                        <HomeCategory
                            category_img="src\assets\community.png"
                            category="Community"
                        />
                        <HomeCategory
                            category_img="src\assets\health.png"
                            category="Health & Wellness"
                        />
                        <HomeCategory
                            category_img="src\assets\festival.png"
                            category="Festival"
                        />
                        <HomeCategory
                            category_img="src\assets\sports.png"
                            category="Sports"
                        />
                    </div>
                </div>

                <img className="home_cat_filter_arrow" src="src\assets\category_filter_arrow.gif"/>
            </div>
        </>
    )
}


export default HomeCategoryFilter;