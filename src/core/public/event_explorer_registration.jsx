import AppLogo1 from '../../components/app_logo_1';
import '../css_files/public/event_explorer_registration.css';

function EventExplorerRegistration() {
    return (
        <>
            <div className="explorer-reg-main-window">
                <div className='explorer-reg-left-section'>
                    <AppLogo1 />
                    <img className='explorer-reg-img' src='src\assets\event-explorer-registration.png' />
                </div>

                <form>
                    <div className='explorer-reg-right-section'>
                        <div>
                            <div className='explorer-reg-backBtn-title-div'>
                                <span className='explorer-reg-back-btn'>&#8592;</span>
                                <p className='explorer-reg-title'>Welcome Back!</p>
                            </div>
                            <p className='explorer-reg-subtitle'>Discover local experiences, curated just for your vibe</p>
                        </div>

                        <input type='text' placeholder='Full name'/>
                        <input type='text' placeholder='Mobile number'/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EventExplorerRegistration;