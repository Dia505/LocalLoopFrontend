import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AppLogo1 from '../../components/app_logo_1';
import "../css_files/public/event_organizer_registration.css";

function EventOrganizerRegistration() {
    const navigate = useNavigate();
    const location = useLocation();
    const [regFormState, setRegFormState] = useState(1);
    const [termsAndConditions, setTermsAndConditions] = useState(false);

    const previousRole = location.state?.selectedRole;

    const handleNextButton = () => {
        setRegFormState(2);
    };

    const handleBackButton = () => {
        setRegFormState(1);
    };

    const handleTermsAndConditionsChange = (event) => {
        setTermsAndConditions(event.target.checked);
    };

    return (
        <>
            <div className="organizer-reg-main-window">
                <div className='organizer-reg-left-section'>
                    <AppLogo1 />
                    <img className='organizer-reg-img' src='src\assets\registration.png' />
                </div>

                {regFormState === 1 && (
                    <form>
                        <div className='organizer-reg-right-section'>
                            <div>
                                <div className='organizer-reg-backBtn-title-div'>
                                    <span className='organizer-reg-back-btn' 
                                        onClick={() => navigate("/role-selection", {state: {selectedRole: previousRole}})}>
                                            &#8592;
                                    </span>
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

                            <button onClick={handleNextButton} className='organizer-reg-next-button'>Next</button>

                            <div className='organizer-reg-login-div'>
                                <p className='organizer-reg-already-have-account-text'>Already have an account?</p>
                                <p className='organizer-reg-login-text' onClick={() => navigate("/login")}>Log In</p>
                            </div>
                        </div>
                    </form>
                )}

                {regFormState === 2 && (
                    <form>
                        <div className='organizer-reg-right-section2'>
                            <div>
                                <div className='organizer-reg-backBtn-title-div'>
                                    <span className='organizer-reg-back-btn' onClick={handleBackButton}>&#8592;</span>
                                    <p className='organizer-reg-title'>Sign up</p>
                                </div>
                                <p className='organizer-reg-subtitle'>Set the stage for your next great event</p>
                            </div>

                            <p className='organizer-reg-personal-details'>Company Details</p>

                            <div className='input-fields-div'>
                                <input type='text' placeholder='Company name' />

                                <select className='business-type-drop-down'>
                                    <option value="" disabled selected hidden>Select your business type</option>
                                    <option value="Event planning agency">Event planning agency</option>
                                    <option value="Restaurant/Hotel/Cafe">Restaurant/Hotel/Cafe</option>
                                    <option value="Club/Bar">Club/Bar</option>
                                    <option value="NGO">NGO</option>
                                    <option value="Educational institution">Educational institution</option>
                                    <option value="Art gallery/studio">Art gallery/studio</option>
                                    <option value="Theatre company">Theatre company</option>
                                    <option value="Retail/Boutique store">Retail/Boutique store</option>
                                    <option value="Fitness/Wellness centre">Fitness/Wellness centre</option>
                                    <option value="Community group">Community group</option>
                                    <option value="Sports facility">Sports facility</option>
                                </select>

                                <input type='text' placeholder='PAN/VAT number' />

                                <div className='address-city-div'>
                                    <input className='address-input' type='text' placeholder='Address' />

                                    <select className='city-drop-down'>
                                        <option value="" disabled selected hidden>Select a city</option>
                                        <option value="Kathmandu">Kathmandu</option>
                                        <option value="Lalitpur">Lalitpur</option>
                                        <option value="Bhaktapur">Bhaktapur</option>
                                        <option value="Pokhara">Pokhara</option>
                                        <option value="Chitwan">Chitwan</option>
                                        <option value="Biratnagar">Biratnagar</option>
                                        <option value="Birgunj">Birgunj</option>
                                        <option value="Butwal">Butwal</option>
                                        <option value="Dharan">Dharan</option>
                                        <option value="Hetauda">Hetauda</option>
                                        <option value="Nepalgunj">Nepalgunj</option>
                                        <option value="Dhangadhi">Dhangadhi</option>
                                        <option value="Janakpur">Janakpur</option>
                                        <option value="Itahari">Itahari</option>
                                    </select>
                                </div>

                                <input type='text' placeholder='Contact number' />
                                <input type='email' placeholder='Company email' />
                                <input type='url' placeholder='Enter your social media links' />
                            </div>

                            <label className='terms-and-condition-div'>
                                <input
                                    className='terms-and-condition-checkbox'
                                    type='checkbox'
                                    checked={termsAndConditions}
                                    onChange={handleTermsAndConditionsChange}
                                />
                                <span className='terms-and-condition-custom-checkbox-visual'></span>

                                <div className='terms-and-condition-text-div'>
                                    <p className='terms-and-condition-text'>Yes, I understand and agree to the
                                        <span className='terms-and-conditions-highlights'> LocalLoop Terms of Service</span>,
                                        including the <span className='terms-and-conditions-highlights'> User Agreement </span>
                                        and <span className='terms-and-conditions-highlights'> Privacy Policy</span></p>
                                </div>
                            </label>

                            <button type="submit" className='organizer-reg-create-account-button'>Create my account</button>

                            <div className='organizer-reg-login-div'>
                                <p className='organizer-reg-already-have-account-text'>Already have an account?</p>
                                <p className='organizer-reg-login-text' onClick={() => navigate("/login")}>Log In</p>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}

export default EventOrganizerRegistration;