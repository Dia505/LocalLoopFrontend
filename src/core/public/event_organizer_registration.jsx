import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AppLogo1 from '../../components/app_logo_1';
import CompanyDetailsForm from '../../components/event_organizer_registration/company_details_form';
import PersonalDetailsForm from '../../components/event_organizer_registration/personal_details_form';
import "../css_files/public/event_organizer_registration.css";

function EventOrganizerRegistration() {
    const [regFormState, setRegFormState] = useState(1);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        mode: 'all',
    });

    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        email: '',
        password: '',
        companyName: '',
        businessType: '',
        panNumber: '',
        address: '',
        city: '',
        contactNumber: '',
        companyEmail: '',
        socialMediaLinks: []
    });

    return (
        <>
            <div className="organizer-reg-main-window">
                <div className='organizer-reg-left-section'>
                    <AppLogo1 />
                    <img className='organizer-reg-img' src='src\assets\registration.png' />
                </div>

                {regFormState === 1 && (
                    <PersonalDetailsForm
                        data={formData}
                        setData={setFormData}
                        setRegFormState={setRegFormState}
                    />
                )}

                {regFormState === 2 && (
                    <CompanyDetailsForm
                        data={formData}
                        setData={setFormData}
                        setRegFormState={setRegFormState}
                    />
                )}
            </div>
        </>
    )
}

export default EventOrganizerRegistration;