import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import "../css_files/organizer_events/ticket_details_form.css";

const ticketSchema = yup.object().shape({
    tickets: yup.array().of(
        yup.object().shape({
            ticketType: yup.string().required("*required"),
            ticketPrice: yup.number().typeError("Price must be a number").required("*required"),
            ticketQuantity: yup.number().typeError("Quantity must be a number").required("*required"),
        })
    )
});

function TicketDetailsForm({ defaultValues = [], onSubmit, onBack }) {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ticketSchema),
        defaultValues: {
            tickets: defaultValues.length > 0 ? defaultValues : [{
                ticketType: "",
                ticketPrice: "",
                ticketQuantity: "",
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tickets"
    });

    const handleFinalSubmit = (data) => {
        console.log("Passing ticket data: ", data);
        onSubmit(data.tickets);
    };


    return (
        <form onSubmit={handleSubmit(handleFinalSubmit)}>
            <div className="ticket-details-form-main-div">
                <p className="ticket-details-form-title">Ticket details</p>

                {fields.map((field, index) => (
                    <div key={field.id} className="ticket-details-form-input-div">
                        <div>
                            <p className="ticket-details-form-input-label">Ticket type</p>
                            <input
                                className={errors?.tickets?.[index]?.ticketType ? "ticket-details-form-input-error" : "ticket-details-form-input"}
                                type="text"
                                {...register(`tickets.${index}.ticketType`)}
                            />
                            {errors?.tickets?.[index]?.ticketType && (
                                <p className="error-message">{errors.tickets[index].ticketType.message}</p>
                            )}
                        </div>

                        <div>
                            <p className="ticket-details-form-input-label">Ticket rate</p>
                            <input
                                className={errors?.tickets?.[index]?.ticketPrice ? "ticket-details-form-input-error" : "ticket-details-form-input"}
                                type="text"
                                {...register(`tickets.${index}.ticketPrice`)}
                            />
                            {errors?.tickets?.[index]?.ticketPrice && (
                                <p className="error-message">{errors.tickets[index].ticketPrice.message}</p>
                            )}
                        </div>

                        <div>
                            <p className="ticket-details-form-input-label">Ticket quantity</p>
                            <input
                                className={errors?.tickets?.[index]?.ticketQuantity ? "ticket-details-form-input-error" : "ticket-details-form-input"}
                                type="text"
                                {...register(`tickets.${index}.ticketQuantity`)}
                            />
                            {errors?.tickets?.[index]?.ticketQuantity && (
                                <p className="error-message">{errors.tickets[index].ticketQuantity.message}</p>
                            )}
                        </div>

                        {index > 0 && (
                            <button
                                type="button"
                                className="ticket-remove-btn"
                                onClick={() => remove(index)}
                            >
                                −
                            </button>
                        )}
                    </div>
                ))}

                <div className="ticket-details-form-divider"></div>

                <div className="ticket-details-form-add-btn-div">
                    <div
                        className="ticket-details-form-add-btn"
                        onClick={() =>
                            append({
                                ticketType: "",
                                ticketPrice: "",
                                ticketQuantity: "",
                            })
                        }
                    >
                        <p className="ticket-details-form-add-icon">+</p>
                    </div>
                </div>

                <div className="ticket-details-form-btns-div">
                    <button type="button" className="ticket-details-form-cancel-btn" onClick={() => onBack()}>
                        Previous
                    </button>
                    <button type="submit" className="ticket-details-form-create-btn">
                        Create event
                    </button>
                </div>
            </div>
        </form>
    );
}

export default TicketDetailsForm;