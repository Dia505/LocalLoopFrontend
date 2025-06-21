import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import * as yup from "yup";

import "../../core/css_files/public/event_organizer_registration.css";

const organizerCompanyDetailsSchema = yup.object().shape({
    companyName: yup.string().required("*required"),
    businessType: yup.string().required("*required"),
    panNumber: yup
        .string()
        .required("*required")
        .matches(/^\d{9}$/, "PAN number must be exactly 9 digits"),
    address: yup.string().required("*required"),
    city: yup.string().required("*required"),
    contactNumber: yup.string().required("*required"),
    companyEmail: yup.string().email("Invalid email").required("*required"),
    socialMediaLinks: yup.array()
        .of(
            yup.string()
                .url("Invalid URL")
                .required("*required")
        )
        .min(1, "*At least one website is required"),
    terms: yup
        .boolean()
        .oneOf([true]),
});

function CompanyDetailsForm({ data, setData, setRegFormState }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger
    } = useForm({
        resolver: yupResolver(organizerCompanyDetailsSchema),
        defaultValues: data
    });


    const navigate = useNavigate();

    const [termsAndConditions, setTermsAndConditions] = useState(false);

    const handleTermsAndConditionsChange = (event) => {
        setTermsAndConditions(event.target.checked);
    };

    const [chipInput, setChipInput] = useState("");
    const [chips, setChips] = useState(data.socialMediaLinks || []);

    const handleBackButton = () => {
        setRegFormState(1);
    };

    const handleChipKeyDown = (e) => {
        if (e.key === "Enter" && chipInput.trim()) {
            e.preventDefault();
            try {
                new URL(chipInput); // validate URL
                const newChips = [...chips, chipInput];
                setChips(newChips);
                setChipInput("");

                // Update form value
                setValue("socialMediaLinks", newChips);
                trigger("socialMediaLinks"); // revalidate
            } catch (error) {
                // optionally show URL format error
            }
        }
    };

    const handleRemoveChip = (index) => {
        const newChips = chips.filter((_, i) => i !== index);
        setChips(newChips);
        setValue("socialMediaLinks", newChips);
        trigger("socialMediaLinks"); // revalidate
    };

    const onSubmit = async (formValues) => {
        formValues.socialMediaLinks = chips; // include chip URLs

        // Combine with previous step data
        const fullFormData = { ...data, ...formValues };

        try {
            const response = await fetch('http://localhost:3000/api/event-organizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fullFormData),
            });

            console.log(response);

            if (!response.ok) throw new Error("Failed to create account");

            toast.success("Registration successful!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
            });

            navigate("/login");
        } catch (error) {
            console.error("Error:", error.message);

            toast.error("Failed to register event explorer. Please try again.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        <div>
                            <input
                                type='text'
                                placeholder='Company name'
                                {...register("companyName")}
                                className={errors.companyName ? "input-error" : ""}
                            />
                            {errors.companyName && <p className="error-message-2">{errors.companyName.message}</p>}
                        </div>

                        <div>
                            <select
                                {...register("businessType")}
                                defaultValue=""
                                className={errors.businessType ? 'select-error' : 'business-type-drop-down'}
                            >
                                <option value="" disabled hidden>Select your business type</option>
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
                            {errors.businessType && <p className="error-message-2">{errors.businessType.message}</p>}
                        </div>

                        <div>
                            <input
                                type='text'
                                placeholder='PAN/VAT number'
                                {...register("panNumber")}
                                className={errors.panNumber ? "input-error" : ""}
                            />
                            {errors.panNumber && <p className="error-message-2">{errors.panNumber.message}</p>}
                        </div>

                        <div className='address-city-div'>
                            <div>
                                <input
                                    className={errors.address ? 'address-input-error' : 'address-input'}
                                    type='text'
                                    placeholder='Address'
                                    {...register("address")}
                                />
                                {errors.address && <p className="error-message-2">{errors.address.message}</p>}
                            </div>

                            <div>
                                <select
                                    className={errors.city ? 'city-drop-down-error' : 'city-drop-down'}
                                    {...register("city")}
                                    defaultValue=""
                                >
                                    <option value="" disabled hidden>Select a city</option>
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
                                {errors.city && <p className="error-message-2">{errors.city.message}</p>}
                            </div>
                        </div>

                        <div>
                            <input
                                type='text'
                                placeholder='Contact number'
                                {...register("contactNumber")}
                                className={errors.contactNumber ? "input-error" : ""}
                            />
                            {errors.contactNumber && <p className="error-message-2">{errors.contactNumber.message}</p>}
                        </div>

                        <div>
                            <input
                                type='email'
                                placeholder='Company email'
                                className={errors.companyEmail ? "input-error" : ""}
                                {...register("companyEmail")}
                            />
                            {errors.companyEmail && <p className="error-message-2">{errors.companyEmail.message}</p>}
                        </div>

                        <div>
                            <div className="chip-input-wrapper">
                                <input
                                    type="url"
                                    placeholder="Paste social media URL and press Enter"
                                    value={chipInput}
                                    onChange={(e) => setChipInput(e.target.value)}
                                    onKeyDown={handleChipKeyDown}
                                    className={errors.socialMediaLinks ? "input-error" : ""}
                                />

                                <div className="chip-container">
                                    {chips.map((url, index) => (
                                        <span key={index} className="chip">
                                            {new URL(url).hostname.replace(/^www\./, '')}
                                            <button type="button" className="chip-close" onClick={() => handleRemoveChip(index)}>×</button>
                                        </span>
                                    ))}
                                </div>

                                {errors.socialMediaLinks && <p className="error-message-2">{errors.socialMediaLinks.message}</p>}
                            </div>

                            {/* Hidden field to register chip values in react-hook-form */}
                            <input type="hidden" {...register("socialMediaLinks")} />
                        </div>

                    </div>

                    <label className='terms-and-condition-div'>
                        <input
                            className='terms-and-condition-checkbox'
                            type='checkbox'
                            {...register("terms")}
                            checked={termsAndConditions}
                            onChange={handleTermsAndConditionsChange}
                        />
                        <span className={`terms-and-condition-custom-checkbox-visual ${errors.terms ? 'checkbox-error' : ''}`}></span>

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
        </>
    )
}

export default CompanyDetailsForm;