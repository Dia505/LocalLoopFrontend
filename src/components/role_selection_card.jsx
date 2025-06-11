import "./css_files/role_selection_card.css";

const RoleSelectionCard = ({ cardImg, cardText, isActive, onClick }) => {
    return (
        // Conditionally apply the 'active-gradient-border' class based on 'isActive' prop
        <div
            className={`card-div ${isActive ? 'active-gradient-border' : ''}`}
            onClick={onClick} // Make the div clickable
        >
            {cardImg && <img src={cardImg} className="card-img" />}
            <div className="card-text-div">
                {cardText && <p className="card-text">{cardText}</p>}
            </div>
        </div>
    );
};

export default RoleSelectionCard;