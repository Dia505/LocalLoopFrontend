import "./css_files/footer.css";

function Footer() {
    return (
        <>
            <div className="footer-main-div">
                <div className="footer-components-wrapper">
                    <div className="footer-first-section">
                        <img className="footer-logo" src="src\assets\logo.png" />

                        <div className="footer-nav-details-div">
                            <div className="footer-nav-detail1">
                                <p className="footer-text1">Home</p>
                                <p className="footer-text1">Contact us</p>
                            </div>

                            <div className="footer-nav-detail1">
                                <p className="footer-text1">Explore</p>
                                <p className="footer-text2">01-44869987</p>
                            </div>

                            <div className="footer-nav-detail1">
                                <p className="footer-text1">Gallery</p>
                                <p className="footer-text2">localloop2025@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="footer-line-divider"></div>

                    <div className="footer-second-section">
                        <p className="footer-copyright">© 2025 LocalLoop. All rights reserved.</p>

                        <div className="footer-social-icon-div">
                            <img className="footer-social-icon" src="src\assets\footer_facebook.png" />
                            <img className="footer-social-icon" src="src\assets\footer_instagram.png" />
                            <img className="footer-social-icon" src="src\assets\footer_x.png" />
                            <img className="footer-social-icon" src="src\assets\footer_tiktok.png" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;