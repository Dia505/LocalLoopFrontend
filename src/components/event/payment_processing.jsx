import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import esewaPayment from "../../assets/esewa_payment.png"; 
import khaltiPayment from "../../assets/khalti_payment.png";

import "../css_files/event/payment_processing.css";

function PaymentProcessing() {
    const navigate = useNavigate();
    const location = useLocation();
    const { paymentMethod, redirectTo, toastMessage } = location.state || {};
    
    const [showRedirect, setShowRedirect] = useState(false);

    useEffect(() => {
        // Show modal after 2 seconds
        const showModalTimer = setTimeout(() => {
            setShowRedirect(true);
        }, 2000);

        // Navigate after 4 seconds
        const redirectTimer = setTimeout(() => {
            navigate(redirectTo || "/", { state: { toastMessage } });
        }, 4000);

        return () => {
            clearTimeout(showModalTimer);
            clearTimeout(redirectTimer);
        };
    }, [navigate, redirectTo, toastMessage]);

    return (
        <div className="payment-processing-main-window">
            <img
                src={paymentMethod === "esewa" ? esewaPayment : khaltiPayment}
                alt="Payment Screenshot"
                className={paymentMethod === "esewa" ? "payment-processing-img" : "payment-processing-img2"}
            />

            {showRedirect && (
                <>
                    <div className="payment-processing-overlay"></div>
                    <div className="payment-processing-modal">
                        <p className="redirect-tick">✅</p>
                        <p className="redirect-title">Payment Successful!</p>
                        <p>Redirecting back to LocalLoop...</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default PaymentProcessing;
