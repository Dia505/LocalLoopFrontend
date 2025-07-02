import contact from "../../assets/contact.png";
import email from "../../assets/email.png";
import location from "../../assets/location.png";
import phone from "../../assets/phone.png";
import "../css_files/public/contact.css";
import Footer from "../../components/footer";

import ExplorerNavBar from "../../components/navigation/explorer_nav_bar";

function Contact() {
    return (
        <>
            <div className="contact-main-window">
                <ExplorerNavBar/>

                <div className="contact-content-section">
                    <div className="contact-details-div">
                        <p className="contact-help-text">How can we help you?</p>
                        <p className="contact-title">Contact Us</p>
                        <div className="contact-subtitle-div">
                            <p className="contact-subtitle">We’re here to help and answer any questions
                                you might have. We look forward to hearing from you!</p>
                        </div>

                        <img className="contact-img-smaller-screen" src={contact} />

                        <div>
                            <div className="contact-icon-detail-div">
                                <img className="contact-icon" src={location} />
                                <p>Kalopul, Kathmandu</p>
                            </div>

                            <div className="contact-icon-detail-div">
                                <img className="contact-icon" src={phone} />
                                <p>01-4489765</p>
                            </div>

                            <div className="contact-icon-detail-div">
                                <img className="contact-email-icon" src={email} />
                                <p>localloop2025@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <img className="contact-img" src={contact} />
                </div>

                <Footer/>
            </div>
        </>
    )
}

export default Contact;