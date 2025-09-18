import apiServices from "../../services/ApiServices";

export const deleteAppointmentApi = async (id) => {
    const response = await apiServices.delete(`appointments_operation`, {
        params: {
            operation: "delete", 
            appointment_id: id,
        }
    });
    return response;
};
