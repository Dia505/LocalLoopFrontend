import { useNavigate } from "react-router-dom";

import "../css_files/home/home_category_filter.css";
import HomeCategory from "./home_category";

function HomeCategoryFilter() {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        navigate(`/search?category=${encodeURIComponent(category)}`);
    };

    return (
        <>
            <div className="home-cat-filter-main-div">
                <div className="home-categories-scroll-wrapper">
                    <div className="home-categories-div">
                        <HomeCategory
                            category_img="src\assets\music.png"
                            category="Music"
                            onClick={handleCategoryClick}
                        />
                        <HomeCategory
                            category_img="src\assets\dance.png"
                            category="Dance"
                            onClick={handleCategoryClick}
                        />
                        <HomeCategory
                            category_img="src\assets\art.png"
                            category="Art"
                            onClick={handleCategoryClick}
                        />
                        <HomeCategory
                            category_img="src\assets\theatre.png"
                            category="Theatre"
                            onClick={handleCategoryClick}
                        />
                        <HomeCategory
                            category_img="src\assets\food.png"
                            category="Food & Drinks"
                            onClick={handleCategoryClick}
                        />
                        <HomeCategory
                            category_img="src\assets\market.png"
                            category="Market & Pop-ups"
                            onClick={handleCategoryClick}
                        />
                        <HomeCategory
                            category_img="src\assets\community.png"
                            category="Community"
                            onClick={handleCategoryClick}
                        />
                        <HomeCategory
                            category_img="src\assets\health.png"
                            category="Health & Wellness"
                            onClick={handleCategoryClick}
                        />
                        <HomeCategory
                            category_img="src\assets\festival.png"
                            category="Festival"
                            onClick={handleCategoryClick}
                        />
                        <HomeCategory
                            category_img="src\assets\sports.png"
                            category="Sports"
                            onClick={handleCategoryClick}
                        />
                    </div>
                </div>

                <img className="home_cat_filter_arrow" src="src\assets\category_filter_arrow.gif"/>
            </div>
        </>
    )
}


export default HomeCategoryFilter;