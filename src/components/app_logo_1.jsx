import { Link } from "react-router-dom";
import "./css_files/app_logo_1.css";

function AppLogo1() {

    return (
        <>
            <Link to="/">
                <div className='logo-div'>
                    <img className='logo-img' src='src\assets\logo.png' />
                    <p className='logo-catchphrase'>Your Loop to Local Life</p>
                </div>
            </Link>
        </>
    )
}

export default AppLogo1;