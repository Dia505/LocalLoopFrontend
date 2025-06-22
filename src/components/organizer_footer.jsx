import logo from "../assets/logo.png";
import "./css_files/organizer_footer.css";
import footer_facebok from "../assets/footer_facebook.png";
import footer_instagram from "../assets/footer_instagram.png";
import footer_x from "../assets/footer_x.png";
import footer_tiktok from "../assets/footer_tiktok.png";

function OrganizerFooter() {
    return (
        <>
            <div className="org-footer-main-div">
                <div className="org-footer-first-section">
                    <img className="org-footer-logo" src={logo} />

                    <div className="org-footer-nav-details-div">
                        <p className="org-footer-text1">Contact us</p>
                        <p className="org-footer-text2">01-44869987</p>
                        <p className="org-footer-text2">localloop2025@gmail.com</p>
                    </div>
                </div>

                <div className="org-footer-line-divider"></div>

                <div className="org-footer-second-section">
                    <p className="org-footer-copyright">© 2025 LocalLoop. All rights reserved.</p>

                    <div className="org-footer-social-icon-div">
                        <img className="org-footer-social-icon" src={footer_facebok} />
                        <img className="org-footer-social-icon" src={footer_instagram} />
                        <img className="org-footer-social-icon" src={footer_x} />
                        <img className="org-footer-social-icon" src={footer_tiktok} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrganizerFooter;