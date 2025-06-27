import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useAuth } from "../../context/auth_context";
import "../css_files/organizer_events/ticket_details_form.css";

const ticketSchema = yup.object().shape({
    tickets: yup.array().of(
        yup.object().shape({
            ticketType: yup.string(),
            ticketPrice: yup.number().typeError("Price must be a number"),
            ticketQuantity: yup.number().typeError("Quantity must be a number"),
        })
    )
});

function TicketDetailsEditForm({ tickets, eventId, closeForm }) {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(ticketSchema),
        defaultValues: {
            tickets: tickets.length > 0 ? tickets : [{
                _id: undefined,
                ticketType: "",
                ticketPrice: "",
                ticketQuantity: ""
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tickets"
    });

    const { authToken } = useAuth();
    const [removedTicketIds, setRemovedTicketIds] = useState([]);

    const onSubmit = async (data) => {
        try {
            const deletePromises = removedTicketIds.map(ticketId =>
                axios.delete(`http://localhost:3000/api/ticket/${ticketId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                })
            );

            const updatePromises = data.tickets.map((ticket) => {
                if (ticket._id) {
                    return axios.put(`http://localhost:3000/api/ticket/${ticket._id}`, ticket, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    });
                } else {
                    return axios.post(`http://localhost:3000/api/ticket`, {
                        ...ticket,
                        eventId: eventId
                    }, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        }
                    });
                }
            });

            await Promise.all([...deletePromises, ...updatePromises]);
            toast.success("Ticket details updated!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "colored",
            });
            closeForm();
        } catch (error) {
            console.error("Error updating tickets:", error);
            toast.error("Failed to update tickets");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                    defaultValue={field.ticketType}
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
                                    defaultValue={field.ticketPrice}
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
                                    defaultValue={field.ticketQuantity}
                                />
                                {errors?.tickets?.[index]?.ticketQuantity && (
                                    <p className="error-message">{errors.tickets[index].ticketQuantity.message}</p>
                                )}
                            </div>

                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    className="ticket-remove-btn"
                                    onClick={() => {
                                        const removedTicket = fields[index];
                                        if (removedTicket._id) {
                                            setRemovedTicketIds(prev => [...prev, removedTicket._id]);
                                        }
                                        remove(index);
                                    }}
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
                                    _id: undefined,
                                    ticketType: "",
                                    ticketPrice: "",
                                    ticketQuantity: ""
                                })
                            }
                        >
                            <p className="ticket-details-form-add-icon">+</p>
                        </div>
                    </div>

                    <div className="ticket-details-edit-form-btns-div">
                        <button
                            type="button"
                            className="ticket-details-form-cancel-btn"
                            onClick={closeForm}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="ticket-details-form-create-btn">
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default TicketDetailsEditForm;