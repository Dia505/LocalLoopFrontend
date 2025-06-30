import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

import AppLogo1 from "../../../components/app_logo_1";
import "../../css_files/public/verify_otp.css";

const verifyOtp = yup.object().shape({
    otp: yup
        .string()
        .required("*OTP required")
        .matches(/^\d{6}$/, "*OTP must be 6 digits"),
});

function VerifyOtp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(verifyOtp),
        mode: "all",
    });

    const navigate = useNavigate();

    const location = useLocation();
    const email = location.state?.email;

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/api/reset/verify-otp", {
                email: email,
                otp: data.otp,
            });
            navigate("/reset-password", { state: { email, otp: data.otp } });
        } catch (err) {
            console.log(err.response ? err.response.data.message : 'Something went wrong');
        }
    };

    return (
        <>
            <div className="verify-otp-main-window">
                <div className='verify-otp-left-section'>
                    <AppLogo1 />

                    <img className='reset-pwd-img' src='src\assets\reset_pwd.png' />
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="verify-otp-right-section">
                        <div className='verify-otp-title-subtitle-div'>
                            <p className='verify-otp-title'>Forgot password?</p>
                            <p className='verify-otp-subtitle'>Check your email and enter the OTP to continue</p>
                        </div>

                        <div className='input-field-div'>
                            <p className='verify-otp-input-title'>OTP code</p>
                            <input
                                type="text"
                                {...register("otp")}
                                className={errors.otp ? "input-error" : ""}
                            />
                            {errors.otp && <p className="error-message">{errors.otp.message}</p>}

                        </div>

                        <button type="submit" className='verify-otp-button'>Verify OTP</button>

                        <p className="verify-otp-back-text">
                            <span>&#8592; </span>
                            Back to
                            <span className="verify-otp-login-btn" onClick={() => navigate("/login")}>  Log In</span>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default VerifyOtp;