import { useEffect, useState } from "react";
import "../css_files/home/home_about_slideshow.css"; 

const slides = [
    {
        title: "1. Hyper-local Discovery",
        description:
            "LocalLoop connects you to niche, under-the-radar events happening nearby, helping you discover experiences that rarely show up on mainstream platforms.",
        img: "src/assets/about_slideshow1.jpg",
    },
    {
        title: "2. Never miss out on events again",
        description:
            "LocalLoop keeps you updated with timely reminders for bookmarked events so you’re always in the loop.",
        img: "src/assets/about_slideshow2.jpeg",
    },
    {
        title: "3. Tailored to your vibe",
        description:
            "Explore events curated to your interests, whether you’re into film, fashion, food, or festivals, in your neighbourhood!",
        img: "src/assets/about_slideshow3.jpeg",
    },
    {
        title: "4. Organizer-friendly tools",
        description:
            "Event organizers get intuitive tools to manage listings, track engagement, and boost visibility without needing tech expertise.",
        img: "src/assets/about_slideshow4.jpg",
    },
];

function HomeAboutSlideshow() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide every 3s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-about-slideshow-div">
            {slides.map((slide, index) => (
                <div
                    className={`home-about-slide ${index === currentSlide ? "active" : ""}`}
                    key={index}
                >
                    <div className="home-about-slideshow-text-div">
                        <p className="home-about-slideshow-title">{slide.title}</p>
                        <div className="home-about-slideshow-subtitle-wrapper">
                            <p>{slide.description}</p>
                        </div>
                    </div>
                    <img className="home-about-slideshow-img" src={slide.img} />
                </div>
            ))}

            <div className="home-about-dots">
                {slides.map((_, i) => (
                    <span
                        key={i}
                        className={`dot ${i === currentSlide ? "active" : ""}`}
                        onClick={() => setCurrentSlide(i)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default HomeAboutSlideshow;
