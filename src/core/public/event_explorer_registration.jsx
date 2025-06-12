import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppLogo1 from '../../components/app_logo_1';
import '../css_files/public/event_explorer_registration.css';

function EventExplorerRegistration() {
    const [termsAndConditions, setTermsAndConditions] = useState(false);
    const navigate = useNavigate();

    const handleTermsAndConditionsChange = (event) => {
        setTermsAndConditions(event.target.checked);
    };

    return (
        <>
            <div className="explorer-reg-main-window">
                <div className='explorer-reg-left-section'>
                    <AppLogo1 />
                    <img className='explorer-reg-img' src='src\assets\registration.png' />
                </div>

                <form>
                    <div className='explorer-reg-right-section'>
                        <div>
                            <div className='explorer-reg-backBtn-title-div'>
                                <span className='explorer-reg-back-btn'>&#8592;</span>
                                <p className='explorer-reg-title'>Sign up</p>
                            </div>
                            <p className='explorer-reg-subtitle'>Discover local experiences, curated just for your vibe</p>
                        </div>

                        <div className='input-fields-div'>
                            <input type='text' placeholder='Full name' />
                            <input type='text' placeholder='Mobile number' />

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

                            <input type='email' placeholder='Email address' />
                            <input type='password' placeholder='Password' />
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

                        <button type="submit" className='explorer-register-button'>Create my account</button>

                        <div className='explorer-register-login-div'>
                            <p className='explorer-register-already-have-account-text'>Already have an account?</p>
                            <p className='explorer-register-login-text' onClick={() => navigate("/login")}>Log In</p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EventExplorerRegistration;