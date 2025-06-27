import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useAuth } from "../../context/auth_context";

import "../css_files/organizer_events/create_event_form.css";

const eventEditFormSchema = yup.object().shape({
    title: yup.string(),
    subtitle: yup
        .string()
        .max(300, "Subtitle must be less than 300 characters"),
    eventType: yup.string(),
    venue: yup.string(),
    address: yup.string(),
    city: yup.string(),
    date: yup
        .date()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
    ,
    startTime: yup.string(),
    endTime: yup.string(),
    eventPhoto: yup
        .mixed()
});

function EventEditForm({ event, closeForm }) {
    const [previewImage, setPreviewImage] = useState("");
    const [updatedImage, setUpdatedImage] = useState(null);
    const [subtitleLength, setSubtitleLength] = useState(0);
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState("");
    const [priceType, setPriceType] = useState("");
    const [limitedSeats, setLimitedSeats] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(eventEditFormSchema),
        mode: "all",
    });

    const { authToken } = useAuth();

    useEffect(() => {
        if (event) {
            setValue("title", event.title);
            setValue("subtitle", event.subtitle);
            setSubtitleLength(event.subtitle.length);
            setValue("eventType", event.eventType);
            setValue("venue", event.venue);
            setValue("address", event.address);
            setValue("city", event.city);
            setValue("date", event.date?.split("T")[0]);
            setValue("startTime", event.startTime);
            setValue("endTime", event.endTime);
            setPreviewImage(`http://localhost:3000/event-images/${event.eventPhoto}`);
            setVideoFile(null);
            setVideoPreview(`http://localhost:3000/event-videos/${event.eventVideo}`);
            setPriceType(event.isPaid ? "Paid" : "Free");
            setLimitedSeats(event.totalSeats > 0);
            setValue("totalSeats", event.totalSeats);
        }
    }, [event]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setUpdatedImage(file);
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

    const handleCheckboxChange = (e) => {
        setLimitedSeats(e.target.checked);
    };

    const handlePriceTypeChange = (value) => {
        setPriceType((prev) => (prev === value ? "" : value));
    };

    const onSubmit = async (data) => {
        try {
            // 1. Update text fields
            const updatedData = {
                title: data.title,
                subtitle: data.subtitle,
                eventType: data.eventType,
                venue: data.venue,
                address: data.address,
                city: data.city,
                date: data.date,
                startTime: data.startTime,
                endTime: data.endTime,
                isPaid: priceType === "Paid",
                totalSeats: limitedSeats ? data.totalSeats : 0,
            };

            // Send updated textual data
            await fetch(`http://localhost:3000/api/event/${event._id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            // 2. Update event photo if changed
            if (updatedImage) {
                const imageForm = new FormData();
                imageForm.append("eventPhoto", updatedImage);

                await fetch(`http://localhost:3000/api/event/${event._id}/event-photo`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: imageForm,
                });
            }

            // 3. Update video if changed
            if (videoFile instanceof File) {
                const videoForm = new FormData();
                videoForm.append("eventVideo", videoFile);

                await fetch(`http://localhost:3000/api/event/${event._id}/event-video`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: videoForm,
                });
            }

            toast.success("Event updated!", {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
            });

            closeForm();
        } catch (err) {
            console.error("Error updating event:", err);
            toast.error("Failed to update event");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                onChange={(e) => {
                                    handleImageChange(e);
                                    setValue("eventPhoto", e.target.files[0], { shouldValidate: true });
                                }}
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
                            {errors.eventPhoto && <p className="error-message">{errors.eventPhoto.message}</p>}
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
                                {!videoPreview ? (
                                    <div className="add-video-btn" onClick={() => document.getElementById("videoInput").click()}>
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
                                            X
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="create-event-form-price-wrapper">
                                <label className="custom-radio-label">
                                    <input
                                        type="radio"
                                        value="Free"
                                        checked={priceType === 'Free'}
                                        onChange={() => handlePriceTypeChange('Free')}
                                    />
                                    <span className="custom-radio-visual"></span>
                                    <p className="radio-label-text">Free</p>
                                </label>

                                <label className="custom-radio-label">
                                    <input
                                        type="radio"
                                        value="Paid"
                                        checked={priceType === 'Paid'}
                                        onChange={() => handlePriceTypeChange('Paid')}
                                    />
                                    <span className="custom-radio-visual"></span>
                                    <p className="radio-label-text">Paid</p>
                                </label>
                            </div>

                            {priceType === "Free" && (
                                <label className="checkbox-label-container">
                                    <input
                                        className="limited-seating-checkbox-input"
                                        type="checkbox"
                                        checked={limitedSeats}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className="custom-checkbox-visual"></span>
                                    <p className="checkbox-label-text">Limited seating?</p>
                                </label>
                            )}

                            {limitedSeats === true && priceType == "Free" && (
                                <div>
                                    <input
                                        className={errors.totalSeats ? "input-error" : ""}
                                        type='text'
                                        name='totalSeats'
                                        {...register("totalSeats")}
                                        placeholder='Total number of seats'
                                    />
                                    {errors.totalSeats && <p className="error-message">{errors.totalSeats.message}</p>}
                                </div>
                            )}

                            <div className='create-event-form-btns-div'>
                                <button type='button' className='create-event-form-cancel-btn' onClick={closeForm}>Cancel</button>
                                <button
                                    type="submit"
                                    className="create-event-form-update-btn"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EventEditForm;