import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import * as yup from "yup";

import createEventImg from "../../assets/create_event_img.jpg";
import "../css_files/organizer_events/create_event_form.css";

const createEventFormSchema = yup.object().shape({
    title: yup.string().required("*required"),
    subtitle: yup
        .string()
        .required("*required")
        .max(300, "Subtitle must be less than 300 characters"),
    eventType: yup.string().required("*required"),
    venue: yup.string().required("*required"),
    address: yup.string().required("*required"),
    city: yup.string().required("*required"),
    date: yup
        .date()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .required("*required"),
    startTime: yup.string().required("*required"),
    endTime: yup.string(),
    isPaid: yup.boolean().required("*required"),
});

function CreateEventForm({ closeForm }) {
    const [previewImage, setPreviewImage] = useState(createEventImg);
    const [selectedFile, setSelectedFile] = useState(null);
    const [subtitleLength, setSubtitleLength] = useState(0);
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState("");
    const [priceType, setPriceType] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm({
        resolver: yupResolver(createEventFormSchema),
        mode: "all",
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setSelectedFile(file);
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("video/")) {
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveVideo = () => {
        setVideoFile(null);
        setVideoPreview("");
    };

    const handleCheckboxChange = (value) => {
        setPriceType((prev) => (prev === value ? "" : value));
    };

    return (
        <>
            <form>
                <div className="create-event-form-main-div">
                    <p className="create-event-form-title">Create event</p>

                    <div className="create-event-form-centre-div">
                        <div className="create-event-form-img-div">
                            <img className="create-event-form-img" src={previewImage} alt="Event" />

                            <input
                                type="file"
                                accept="image/*"
                                id="createEventImgInput"
                                className="create-event-form-hidden-img-input"
                                onChange={handleImageChange}
                            />

                            <button
                                className="create-event-form-img-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("createEventImgInput").click();
                                }}
                            >
                                Upload picture
                            </button>
                        </div>

                        <div className="create-event-form-input-div">
                            <div>
                                <p className='create-event-form-input-label'>Title</p>
                                <input
                                    type='text'
                                    name='title'
                                    {...register("title")}
                                    className={errors.title ? "input-error" : ""}
                                />
                                {errors.title && <p className="error-message">{errors.title.message}</p>}
                            </div>

                            <div className="textarea-container">
                                <p className='create-event-form-input-label'>Subtitle</p>
                                <textarea
                                    name='subtitle'
                                    maxLength={300}
                                    {...register("subtitle")}
                                    className={errors.subtitle ? "input-error" : ""}
                                    onChange={(e) => {
                                        setSubtitleLength(e.target.value.length);
                                        // Let react-hook-form still handle the value
                                        register("subtitle").onChange(e);
                                    }}
                                />
                                <span className="char-count">{subtitleLength}/300</span>
                                {errors.subtitle && <p className="error-message">{errors.subtitle.message}</p>}
                            </div>


                            <div>
                                <p className='create-event-form-input-label'>Event type</p>
                                <select
                                    {...register("eventType")}
                                    defaultValue=""
                                    className={errors.eventType ? 'select-error' : ''}
                                >
                                    <option value="" disabled hidden>Select the event type</option>
                                    <option value="Music">Music</option>
                                    <option value="Dance">Dance</option>
                                    <option value="Art">Art</option>
                                    <option value="Theatre">Theatre</option>
                                    <option value="Food & Drinks">Food & Drinks</option>
                                    <option value="Market & Pop-ups">Market & Pop-ups</option>
                                    <option value="Community">Community</option>
                                    <option value="Health & Wellness">Health & Wellness</option>
                                    <option value="Festival">Festival</option>
                                    <option value="Sports">Sports</option>
                                </select>
                                {errors.eventType && <p className="error-message">{errors.eventType.message}</p>}
                            </div>

                            <div>
                                <p className='create-event-form-input-label'>Venue</p>
                                <input
                                    type='text'
                                    name='venue'
                                    {...register("venue")}
                                    className={errors.venue ? "input-error" : ""}
                                />
                                {errors.venue && <p className="error-message">{errors.venue.message}</p>}
                            </div>

                            <div className='create-event-form-address-city-div'>
                                <div>
                                    <p className='create-event-form-input-label'>Address</p>
                                    <input
                                        className={errors.address ? 'create-event-form-address-input-error' : 'create-event-form-address-input'}
                                        type='text'
                                        {...register("address")}
                                    />
                                    {errors.address && <p className="error-message">{errors.address.message}</p>}
                                </div>

                                <div>
                                    <p className='create-event-form-input-label'>City</p>
                                    <select
                                        className={errors.city ? 'create-event-form-city-drop-down-error' : 'create-event-form-city-drop-down'}
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
                                <p className='create-event-form-input-label'>Date</p>
                                <input
                                    type='date'
                                    name='date'
                                    {...register("date")}
                                    className={errors.date ? "input-error" : ""}
                                />
                                {errors.date && <p className="error-message">{errors.date.message}</p>}
                            </div>

                            <div className='create-event-form-address-city-div'>
                                <div>
                                    <p className='create-event-form-input-label'>Start time</p>
                                    <input
                                        className={errors.address ? 'create-event-form-address-input-error' : 'create-event-form-address-input'}
                                        type='time'
                                        {...register("startTime")}
                                    />
                                    {errors.startTime && <p className="error-message">{errors.startTime.message}</p>}
                                </div>

                                <div>
                                    <p className='create-event-form-input-label'>End time</p>
                                    <input
                                        className='create-event-form-address-input'
                                        type='time'
                                        {...register("endTime")}
                                    />
                                </div>
                            </div>

                            <div className="video-upload-wrapper">
                                {!videoFile ? (
                                    <div className="add-video-btn" onClick={() => document.getElementById("videoInput").click()}>
                                        {/* <FaPlay className="play-icon" /> */}
                                        <span>Add video</span>
                                        <input
                                            type="file"
                                            id="videoInput"
                                            accept="video/*"
                                            onChange={handleVideoChange}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                ) : (
                                    <div className="video-preview-container">
                                        <video className="video-preview" controls src={videoPreview} />
                                        <button className="remove-video-btn" onClick={handleRemoveVideo}>
                                            {/* <FaTimes /> */}X
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="create-event-form-price-wrapper">
                                <label className="checkbox-label-container">
                                    <input
                                        className="price-checkbox-input"
                                        type="checkbox"
                                        checked={priceType === 'Free'}
                                        onChange={() => handleCheckboxChange('Free')}
                                    />
                                    <span className="custom-checkbox-visual"></span>
                                    <p className="checkbox-label-text">Free</p>
                                </label>

                                <label className="checkbox-label-container">
                                    <input
                                        className="price-checkbox-input"
                                        type="checkbox"
                                        checked={priceType === 'Paid'}
                                        onChange={() => handleCheckboxChange('Paid')}
                                    />
                                    <span className="custom-checkbox-visual"></span>
                                    <p className="checkbox-label-text">Paid</p>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateEventForm;