import apiServices from "../../services/ApiServices";

// Get Single Appointment API
export const getSingleAppointmentApi = async (appointmentId) => {
  let response = await apiServices.post(
    `appointments_operation/${appointmentId}`,
    {
      appointment_id: appointmentId,
      operation: "get",
    }
  );
  return response;
};
