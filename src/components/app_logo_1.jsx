import "./css_files/app_logo_1.css";
import { useNavigate } from "react-router-dom";

function AppLogo1() {
    const navigate = useNavigate();

    return (
        <>
            <div className='logo-div'>
                <img className='logo-img' src='src\assets\logo.png' />
                <p className='logo-catchphrase'>Your Loop to Local Life</p>
            </div>
        </>
    )
}

export default AppLogo1;