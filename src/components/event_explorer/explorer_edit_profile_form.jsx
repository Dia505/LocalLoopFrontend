import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import * as yup from "yup";
import { useAuth } from "../../context/auth_context";

import "../css_files/event_explorer/explorer_edit_profile_form.css";

const explorerEditProfileSchema = yup.object().shape({
    fullName: yup.string(),
    mobileNumber: yup.string().matches(/^9[678]\d{8}$/, "Invalid mobile number"),
    address: yup.string(),
    city: yup.string(),
    email: yup.string().email("Invalid email"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
});

function ExplorerEditProfileForm({ closeForm }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(explorerEditProfileSchema),
        mode: "all",
    });

    const { authToken } = useAuth();
    const [user, setUser] = useState(null);
    const [image, setImage] = useState("");
    const [updatedProfilePicture, setUpdatedProfilePicture] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!authToken) return;
            try {
                const decoded = jwtDecode(authToken);
                const userId = decoded._id;

                console.log("User id: ", userId);

                const response = await axios.get(
                    `http://localhost:3000/api/event-explorer/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                const data = response.data;
                setUser(data);
                setValue("fullName", data.fullName);
                setValue("mobileNumber", data.mobileNumber);
                setValue("address", data.address);
                setValue("city", data.city);
                setValue("email", data.email);
                setValue("password", data.password);
                setImage(data?.profilePicture);
                setUserId(data._id);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [authToken]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setUpdatedProfilePicture(file);
        }
    };

    const onSubmit = async (data) => {
        if (!authToken) return;

        const updatedData = {
            fullName: data.fullName,
            mobileNumber: data.mobileNumber,
            address: data.address,
            city: data.city,
        };

        if (data.email && data.email !== user.email) {
            updatedData.email = data.email;
        }

        if (data.password && data.password !== user.password) {
            updatedData.password = data.password;
        }

        try {
            if (image !== user.profilePicture && updatedProfilePicture) {
                const formData = new FormData();
                formData.append("profilePicture", updatedProfilePicture);

                const pictureResponse = await fetch(
                    `http://localhost:3000/api/event-explorer/${userId}/profile-picture`,
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
                `http://localhost:3000/api/event-explorer/${userId}`,
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

    const handleCancel = () => {
        reset(user);
        setImage(user.profilePicture);
        closeForm();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="explorer-edit-profile-form">
                    <p className="explorer-edit-profile-title">Edit profile</p>

                    <div className='explorer-edit-profile-img-inputs-div'>
                        <div className='explorer-edit-profile-img-div'>
                            <img className="explorer-edit-profile-img" src={image} />

                            <input
                                type="file"
                                accept="image/*"
                                id="fileInput"
                                className="hidden-img-input"
                                onChange={handleImageChange}
                            />

                            <button className='explorer-edit-profile-update-img-btn' onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('fileInput').click();
                            }}>Update picture</button>
                        </div>

                        <div className="explorer-edit-profile-input-div">
                            <div>
                                <p className='explorer-edit-profile-input-label'>Full name</p>
                                <input
                                    type='text'
                                    name='fullName'
                                    {...register("fullName")}
                                    className={errors.fullName ? "input-error" : ""}
                                />
                                {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
                            </div>

                            <div>
                                <p className='explorer-edit-profile-input-label'>Mobile number</p>
                                <input
                                    type='text'
                                    name='mobileNumber'
                                    {...register("mobileNumber")}
                                    className={errors.mobileNumber ? "input-error" : ""}
                                />
                                {errors.mobileNumber && <p className="error-message">{errors.mobileNumber.message}</p>}
                            </div>

                            <div className='explorer-edit-profile-address-city-div'>
                                <div>
                                    <p className='explorer-edit-profile-input-label'>Address</p>
                                    <input
                                        className={errors.address ? 'address-input-error' : 'address-input'}
                                        type='text'
                                        name='address'
                                        {...register("address")}
                                    />
                                    {errors.address && <p className="error-message">{errors.address.message}</p>}
                                </div>

                                <div>
                                    <p className='explorer-edit-profile-input-label'>City</p>
                                    <select
                                        className={errors.city ? 'select-error' : 'city-drop-down'}
                                        {...register("city")}
                                    >
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
                                    {errors.city && <p className="error-message">{errors.city.message}</p>}
                                </div>
                            </div>

                            <div>
                                <p className='explorer-edit-profile-input-label'>Email address</p>
                                <input
                                    type='email'
                                    name='email'
                                    className={errors.email ? "input-error" : ""}
                                    {...register("email")}
                                />
                                {errors.email && <p className="error-message">{errors.email.message}</p>}
                            </div>

                            <div>
                                <p className='explorer-edit-profile-input-label'>Password</p>
                                <input
                                    type='password'
                                    name='password'
                                    className={errors.password ? "input-error" : ""}
                                    {...register("password")}
                                />
                                {errors.password && <p className="error-message">{errors.password.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className='explorer-edit-profile-btns-div'>
                        <button className='explorer-edit-profile-cancel-btn' onClick={handleCancel}>Cancel</button>
                        <button type='submit' className='explorer-edit-profile-update-btn'>Update</button>
                    </div>
                </div>
            </form>
        </>
    )
};

export default ExplorerEditProfileForm;