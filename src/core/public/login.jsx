import { useState } from 'react';
import "../css_files/login.css";

function Login() {
    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    return (
        <>
            <div className="main-window">

                <div className='left-section'>
                    <div className='logo-div'>
                        <img className='logo-img' src='src\assets\logo.png' />
                        <p className='logo-catchphrase'>Your Loop to Local Life</p>
                    </div>

                    <img className='login-img' src='src\assets\login.png' />
                </div>

                <div className='right-section'>
                    <div className='title-subtitle-div'>
                        <p className='login-title'>Welcome Back!</p>
                        <p className='login-subtitle'>Log in to your account</p>
                    </div>

                    <div className='input-field-div'>
                        <p className='email-input-title'>Email address</p>
                        <input />
                    </div>

                    <div className='input-field-div'>
                        <p className='email-input-title'>Password</p>
                        <input type='password' />
                    </div>

                    <div className='rememberMe-forgotPass-div'>
                        <label className='checkbox-label-container'>
                            {/* Hidden native checkbox input for functionality and accessibility */}
                            <input
                                className='remember-me-checkbox'
                                type='checkbox'
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                            />
                            <span className='custom-checkbox-visual'></span>

                            <p className='remember-me-text'>Remember me</p>
                        </label>

                        <p className='forgot-password-text'>Forgot password?</p>
                    </div>

                    <button className='login-button'>Log In</button>

                    <div className='sign-up-div'>
                        <p className='new-to-localloop-text'>New to LocalLoop?</p>
                        <p className='sign-up-text'>Sign Up</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login;