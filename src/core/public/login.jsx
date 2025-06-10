import React from 'react';
import "../css_files/login.css";

function Login() {
    return (
        <>
            <div className="main-window">

                <div className='left-section'>
                    <div className='logo-div'>
                        <img className='logo-img' src='src\assets\logo.png'/>
                        <p className='logo-catchphrase'>Your Loop to Local Life</p>
                    </div>

                    <img className='login-img' src='src\assets\login.png'/>
                </div>

                <div className='right-section'>
                    <div className='title-subtitle-div'>
                        <p className='login-title'>Welcome Back!</p>
                        <p className='login-subtitle'>Log in to your account</p>
                    </div>

                    <div className='input-field-div'>
                        <p className='email-input-title'>Email address</p>
                        <input/>
                    </div>

                    <div className='input-field-div'>
                        <p className='email-input-title'>Password</p>
                        <input type='password'/>
                    </div>

                    <div className='rememberMe-forgotPass-div'> 
                        <div className='remember-me-div'>
                            <input className='remember-me-checkbox' type='checkbox'/>
                            <p className='remember-me-text'>Remember me</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login;