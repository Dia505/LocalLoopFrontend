import "../css_files/home/home_category.css"

function HomeCategory({category_img, category, onClick}) {
    return(
        <>
            <div className="home-category-main-div" onClick={() => onClick(category)}>
                <img className="category-img" src={category_img}/>
                <p className="category">{category}</p>
            </div>
        </>
    )
}

export default HomeCategory;