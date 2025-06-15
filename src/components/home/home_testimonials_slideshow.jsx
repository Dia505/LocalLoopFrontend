import "../css_files/home/home_testimonials_slideshow.css"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const testimonials = [
    {
        text: `I used to miss all the cool events because I’d find out too late. 
        LocalLoop totally changed that—now I actually plan my weekends! 
        The reminders and personalized picks are 🔥.`,
        name: "Tyler Thompson",
        role: "Event Explorer",
        img: "src/assets/home_testimonial_user1.jpg",
    },
    {
        text: `LocalLoop has made finding events so effortless. 
        I used to scroll for hours, but now everything I’d enjoy, from art markets to cozy gigs, is right there. 
        It feels like the city finally speaks my vibe.`,
        name: "Anjali Shah",
        role: "Event Explorer",
        img: "src/assets/home_testimonial_user2.jpg",
    },
    {
        text: `LocalLoop has completely changed how we reach our audience. 
        Posting events is easy, and we’ve seen a noticeable boost in turnout. 
        It feels great to connect with people who genuinely care about the kind of experiences we create.`,
        name: "Star Events Pvt. Ltd",
        role: "Event Organizer",
        img: "src/assets/home_testimonial_user3.jpg",
    },
];

function HomeTestimonialsSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const current = testimonials[currentIndex];

    return (
        <div className="home-testimonial-div">
            <div className="home-testimonial-inner-div">
                <p className="home-testimonial-text">{current.text}</p>

                <div className="home-testimonial-user-div">
                    <img className="home-testimonial-user-img" src={current.img} />

                    <div className="home-testimonial-user-inner-div">
                        <p className="home-testimonial-user-name">{current.name}</p>
                        <p className="home-testimonial-user-role">{current.role}</p>
                    </div>
                </div>
            </div>

            <div className="home-testimonial-arrow-main-div">
                <div className="home-testimonial-arrow-div" onClick={handlePrev}>
                    <FontAwesomeIcon className="home-testimonial-arrow" icon={faChevronLeft} />
                </div>

                <div className="home-testimonial-arrow-div" onClick={handleNext}>
                    <FontAwesomeIcon className="home-testimonial-arrow" icon={faChevronRight} />
                </div>
            </div>
        </div>
    );
}

export default HomeTestimonialsSlideshow;
