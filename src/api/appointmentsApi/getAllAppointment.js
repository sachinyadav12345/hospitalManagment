import apiServices from "../../services/ApiServices";

// Get All Appointments API
export const getAllAppointmentApi = async (params = {}) => {
  const response = await apiServices.post("/appointments_operation", {
    operation: "get_all",
    ...params
  });
  console.log("Appointments fetched successfully:", response);
  return response;
};
