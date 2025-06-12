import { useNavigate } from 'react-router-dom';

import AppLogo1 from '../../components/app_logo_1';
import "../css_files/public/event_organizer_registration.css";

function EventOrganizerRegistration() {
    const navigate = useNavigate();
    
    return (
        <>
            <div className="organizer-reg-main-window">
                <div className='organizer-reg-left-section'>
                    <AppLogo1 />
                    <img className='organizer-reg-img' src='src\assets\registration.png' />
                </div>

                <form>
                    <div className='organizer-reg-right-section'>
                        <div>
                            <div className='organizer-reg-backBtn-title-div'>
                                <span className='organizer-reg-back-btn'>&#8592;</span>
                                <p className='organizer-reg-title'>Sign up</p>
                            </div>
                            <p className='organizer-reg-subtitle'>Set the stage for your next great event</p>
                        </div>

                        <p className='organizer-reg-personal-details'>Personal Details</p>

                        <div className='input-fields-div'>
                            <input type='text' placeholder='Full name' />
                            <input type='text' placeholder='Mobile number' />
                            <input type='email' placeholder='Email address' />
                            <input type='password' placeholder='Password' />
                        </div>

                        <button type="submit" className='organizer-reg-next-button'>Next</button>

                        <div className='organizer-reg-login-div'>
                            <p className='organizer-reg-already-have-account-text'>Already have an account?</p>
                            <p className='organizer-reg-login-text' onClick={() => navigate("/login")}>Log In</p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EventOrganizerRegistration;