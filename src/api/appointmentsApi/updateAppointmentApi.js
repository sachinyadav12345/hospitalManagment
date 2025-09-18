import apiServices from "../../services/ApiServices";

// Update Appointment API
export const updateAppointmentApi = async (appointmentId, appointmentData) => {
  const apiAppointmentData = {
    operation: "update",
    ...appointmentData,
  };

  const response = await apiServices.put(
    `/appointments_operation/${appointmentId}`,
    apiAppointmentData
  );
  console.log("Appointment updated successfully:", response);
  return response;
};
