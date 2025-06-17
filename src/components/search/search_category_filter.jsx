import { useState } from "react";

import "../css_files/search/search_category_filter.css";

function SearchCategoryFilter({ categoryImg, category, selectedCategory, onCategorySelect }) {
    const isSelected = selectedCategory === category;

    const handleClick = () => {
        onCategorySelect(isSelected ? "" : category);
    };

    return (
        <div
            className={isSelected ? "search-category-div2" : "search-category-div"}
            onClick={handleClick}
        >
            <img className="search-category-img" src={categoryImg} alt={category} />
            <p className="search-category">{category}</p>
        </div>
    );
}

export default SearchCategoryFilter;