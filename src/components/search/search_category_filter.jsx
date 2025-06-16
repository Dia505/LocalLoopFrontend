import { useState } from "react";

import "../css_files/search/search_category_filter.css";

function SearchCategoryFilter({ categoryImg, category }) {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        setIsSelected((prev) => !prev);
    };

    return (
        <div
            className={isSelected ? "search-category-div2" : "search-category-div"}
            onClick={handleClick}
        >
            <img className="search-category-img" src={categoryImg} />
            <p className="search-category">{category}</p>
        </div>
    );
}

export default SearchCategoryFilter;