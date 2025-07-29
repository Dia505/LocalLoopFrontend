import { useState } from "react";
import "../css_files/home/home_faq.css";

function HomeFaq({ question, answer }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="faq-div"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="faq-question-div">
                <p>{question}</p>
                <p className="faq-plus-icon">{isHovered ? "−" : "+"}</p>
            </div>

            <div className={`faq-answer-wrapper ${isHovered ? 'open' : ''}`}>
                <p className="faq-answer">{answer}</p>
            </div>
        </div>
    );
}

export default HomeFaq;
