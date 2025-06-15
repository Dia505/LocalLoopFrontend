import "./css_files/home_category.css"

function HomeCategory({category_img, category}) {
    return(
        <>
            <div className="home-category-main-div">
                <img className="category-img" src={category_img}/>
                <p className="category">{category}</p>
            </div>
        </>
    )
}

export default HomeCategory;