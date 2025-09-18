import apiServices from "../../services/ApiServices";

// Get All Appointments API
export const getAllAppointmentApi = async () => {
  const response = await apiServices.post("/appointments_operation", {
    operation: "get_all",
  });
  console.log("Appointments fetched successfully:", response);
  return response;
};
