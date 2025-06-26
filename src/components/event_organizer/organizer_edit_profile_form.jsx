import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../context/auth_context";
import { toast } from "react-toastify";

import "../css_files/event_organizer/organizer_edit_profile_form.css";

const organizerEditProfileSchema = yup.object().shape({
    fullName: yup.string(),
    mobileNumber: yup.string().matches(/^9[678]\d{8}$/, "Invalid mobile number"),
    email: yup.string().email("Invalid email"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&#]/, "Password must contain at least one special character"),
    companyEmail: yup.string(),
    businessType: yup.string(),
    panNumber: yup.string().matches(/^\d{9}$/, "PAN number must be exactly 9 digits"),
    address: yup.string(),
    city: yup.string(),
    contactNumber: yup.string(),
    companyEmail: yup.string().email("Invalid email"),
    socialMediaLinks: yup.array()
        .of(
            yup.string()
                .url("Invalid URL")
        )
        .min(1, "*At least one website is required")
});

function OrganizerEditProfileForm({ closeForm }) {
    const { authToken } = useAuth();
    const [organizer, setOrganizer] = useState(null);
    const [image, setImage] = useState("");
    const [updatedProfilePicture, setUpdatedProfilePicture] = useState(null);
    const [chips, setChips] = useState([]);
    const [chipInput, setChipInput] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(organizerEditProfileSchema),
        mode: "all",
    });

    const decoded = jwtDecode(authToken);
    const organizerId = decoded._id || decoded.id;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setUpdatedProfilePicture(file);
        }
    };

    useEffect(() => {
        const fetchOrganizerDetails = async () => {
            try {
                if (!authToken) return;

                const response = await axios.get(
                    `http://localhost:3000/api/event-organizer/${organizerId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                const data = response.data;
                setOrganizer(data);
                setValue("fullName", data.fullName);
                setValue("mobileNumber", data.mobileNumber);
                setValue("email", data.email);
                setValue("password", data.password);
                setValue("companyName", data.companyName);
                setValue("businessType", data.businessType);
                setValue("panNumber", data.panNumber);
                setValue("address", data.address);
                setValue("city", data.city);
                setValue("contactNumber", data.contactNumber);
                setValue("companyEmail", data.companyEmail);

                setImage(data?.profilePicture);

                setChips(data.socialMediaLinks || []);
                setValue("socialMediaLinks", data.socialMediaLinks || []);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchOrganizerDetails();
    }, [authToken]);

    const handleChipKeyDown = (e) => {
        if (e.key === "Enter" && chipInput.trim()) {
            e.preventDefault();

            try {
                new URL(chipInput);
                if (!chips.includes(chipInput)) {
                    const updatedChips = [...chips, chipInput];
                    setChips(updatedChips);
                    setValue("socialMediaLinks", updatedChips);
                }
                setChipInput("");
            } catch (err) {
                console.log("Error occured: ", err);
            }
        }
    };

    const handleRemoveChip = (index) => {
        const updatedChips = chips.filter((_, i) => i !== index);
        setChips(updatedChips);
        setValue("socialMediaLinks", updatedChips);
    };

    const handleCancel = () => {
        reset(user);
        setImage(user.profilePicture);
        closeForm();
    };

    const onSubmit = async (data) => {
        const updatedData = {
            fullName: data.fullName,
            mobileNumber: data.mobileNumber,
            businessType: data.businessType,
            panNumber: data.panNumber,
            address: data.address,
            city: data.city,
            contactNumber: data.contactNumber,
            socialMediaLinks: data.socialMediaLinks
        };

        if (data.email && data.email !== organizer.email) {
            updatedData.email = data.email;
        }

        if(data.companyEmail && data.companyEmail !== organizer.companyEmail) {
            updatedData.companyEmail = data.companyEmail;
        }

        if (data.password && data.password !== organizer.password) {
            updatedData.password = data.password;
        }

        try {
            if (image !== organizer.profilePicture && updatedProfilePicture) {
                const formData = new FormData();
                formData.append("profilePicture", updatedProfilePicture);

                const pictureResponse = await fetch(
                    `http://localhost:3000/api/event-organizer/${organizerId}/profile-picture`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                        body: formData,
                    }
                );

                const pictureResult = await pictureResponse.json();
                console.log("Profile picture updated:", pictureResult);
            }

            const response = await fetch(
                `http://localhost:3000/api/event-organizer/${organizerId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            const result = await response.json();

            toast.success("Profile updated!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
            });

            closeForm();

        } catch (err) {
            console.error("Error updating profile:", err);
            toast.error("Failed to update profile");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="organizer-edit-form">
                    <div className='organizer-edit-form-img-div'>
                        <img className="organizer-edit-form-img" src={image} />

                        <input
                            type="file"
                            accept="image/*"
                            id="fileInput"
                            className="hidden-img-input"
                            onChange={handleImageChange}
                        />

                        <button className='organizer-edit-form-update-img-btn' onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('fileInput').click();
                        }}>Update picture</button>
                    </div>

                    <div className="organizer-edit-form-details-div">
                        <div className="organizer-edit-form-details-section">
                            <p className="organizer-edit-form-title">Personal details</p>

                            <div>
                                <p className='organizer-edit-form-input-label'>Full name</p>
                                <input
                                    type='text'
                                    name='fullName'
                                    {...register("fullName")}
                                    className={errors.fullName ? "input-error" : ""}
                                />
                                {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
                            </div>

                            <div>
                                <p className='organizer-edit-form-input-label'>Mobile number</p>
                                <input
                                    type='text'
                                    name='mobileNumber'
                                    {...register("mobileNumber")}
                                    className={errors.mobileNumber ? "input-error" : ""}
                                />
                                {errors.mobileNumber && <p className="error-message">{errors.mobileNumber.message}</p>}
                            </div>

                            <div>
                                <p className='organizer-edit-form-input-label'>Email address</p>
                                <input
                                    type='text'
                                    name='email'
                                    {...register("email")}
                                    className={errors.email ? "input-error" : ""}
                                />
                                {errors.email && <p className="error-message">{errors.email.message}</p>}
                            </div>

                            <div>
                                <p className='organizer-edit-form-input-label'>Password</p>
                                <input
                                    type='password'
                                    name='password'
                                    {...register("password")}
                                    className={errors.password ? "input-error" : ""}
                                />
                                {errors.password && <p className="error-message">{errors.password.message}</p>}
                            </div>
                        </div>

                        <div className="organizer-edit-form-divider"></div>

                        <div className="organizer-edit-form-details-section">
                            <p className="organizer-edit-form-title">Company details</p>

                            <div>
                                <p className='organizer-edit-form-input-label'>Company name</p>
                                <input
                                    type='text'
                                    name='companyName'
                                    {...register("companyName")}
                                    className={errors.companyName ? "input-error" : ""}
                                />
                                {errors.companyName && <p className="error-message">{errors.companyName.message}</p>}
                            </div>

                            <div>
                                <p className='organizer-edit-form-input-label'>Business type</p>
                                <select
                                    {...register("businessType")}
                                    className={errors.businessType ? 'select-error' : ''}
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
                                <p className='organizer-edit-form-input-label'>PAN/VAT number</p>
                                <input
                                    type='text'
                                    name='panNumber'
                                    {...register("panNumber")}
                                    className={errors.panNumber ? "input-error" : ""}
                                />
                                {errors.panNumber && <p className="error-message">{errors.panNumber.message}</p>}
                            </div>

                            <div className='organizer-edit-form-address-city-div'>
                                <div>
                                    <p className='organizer-edit-form-input-label'>Address</p>
                                    <input
                                        className={errors.address ? 'address-input-error' : 'address-input'}
                                        type='text'
                                        placeholder='Address'
                                        {...register("address")}
                                    />
                                    {errors.address && <p className="error-message">{errors.address.message}</p>}
                                </div>

                                <div>
                                    <p className='organizer-edit-form-input-label'>City</p>
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
                                    {errors.city && <p className="error-message">{errors.city.message}</p>}
                                </div>
                            </div>

                            <div>
                                <p className='organizer-edit-form-input-label'>Contact number</p>
                                <input
                                    type='text'
                                    name='contactNumber'
                                    {...register("contactNumber")}
                                    className={errors.contactNumber ? "input-error" : ""}
                                />
                                {errors.contactNumber && <p className="error-message">{errors.contactNumber.message}</p>}
                            </div>

                            <div>
                                <p className='organizer-edit-form-input-label'>Company email</p>
                                <input
                                    type='text'
                                    name='companyEmail'
                                    {...register("companyEmail")}
                                    className={errors.companyEmail ? "input-error" : ""}
                                />
                                {errors.companyEmail && <p className="error-message">{errors.companyEmail.message}</p>}
                            </div>

                            <div>
                                <p className='organizer-edit-form-input-label'>Social media links</p>
                                <div className="chip-input-wrapper">
                                    <input
                                        type="url"
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

                                    {errors.socialMediaLinks && <p className="error-message">{errors.socialMediaLinks.message}</p>}
                                </div>

                                <input type="hidden" {...register("socialMediaLinks")} />
                            </div>
                        </div>
                    </div>

                    <div className='organizer-edit-form-btns-div'>
                        <button className='organizer-edit-form-cancel-btn' onClick={handleCancel}>Cancel</button>
                        <button type='submit' className='organizer-edit-form-update-btn'>Update</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default OrganizerEditProfileForm;