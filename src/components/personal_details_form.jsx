import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

import "../core/css_files/public/event_organizer_registration.css";

const organizerPersonalDetailsSchema = yup.object().shape({
    fullName: yup.string().required("*required"),
    mobileNumber: yup.string().matches(/^9[678]\d{8}$/, "Invalid mobile number").required("*required"),
    email: yup.string().email("Invalid email").required("*required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password cannot exceed 16 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
        .required("*required"),
});

function PersonalDetailsForm({ data, setData, setRegFormState }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(organizerPersonalDetailsSchema),
        defaultValues: data,
    });

    const navigate = useNavigate();
    const location = useLocation();

    const previousRole = location.state?.selectedRole;

    const onSubmit = (formValues) => {
        setData((prev) => ({ ...prev, ...formValues }));
        setRegFormState(2);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='organizer-reg-right-section'>
                    <div>
                        <div className='organizer-reg-backBtn-title-div'>
                            <span className='organizer-reg-back-btn'
                                onClick={() => navigate("/role-selection", { state: { selectedRole: previousRole } })}>
                                &#8592;
                            </span>
                            <p className='organizer-reg-title'>Sign up</p>
                        </div>
                        <p className='organizer-reg-subtitle'>Set the stage for your next great event</p>
                    </div>

                    <p className='organizer-reg-personal-details'>Personal Details</p>

                    <div className='input-fields-div'>
                        <div>
                            <input
                                type='text'
                                placeholder='Full name'
                                {...register("fullName")}
                                className={errors.fullName ? "input-error" : ""}
                            />
                            {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
                        </div>

                        <div>
                            <input
                                type='text'
                                placeholder='Mobile number'
                                {...register("mobileNumber")}
                                className={errors.mobileNumber ? "input-error" : ""}
                            />
                            {errors.mobileNumber && <p className="error-message">{errors.mobileNumber.message}</p>}
                        </div>

                        <div>
                            <input
                                type='email'
                                placeholder='Email address'
                                className={errors.email ? "input-error" : ""}
                                {...register("email")}
                            />
                            {errors.email && <p className="error-message">{errors.email.message}</p>}
                        </div>

                        <div>
                            <input
                                type='password'
                                placeholder='Password'
                                className={errors.password ? "input-error" : ""}
                                {...register("password")}
                            />
                            {errors.password && <p className="error-message">{errors.password.message}</p>}
                        </div>
                    </div>

                    <button className='organizer-reg-next-button'>Next</button>

                    <div className='organizer-reg-login-div'>
                        <p className='organizer-reg-already-have-account-text'>Already have an account?</p>
                        <p className='organizer-reg-login-text' onClick={() => navigate("/login")}>Log In</p>
                    </div>
                </div>
            </form>
        </>
    )
}

export default PersonalDetailsForm;