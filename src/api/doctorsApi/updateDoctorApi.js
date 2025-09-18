import apiServices from "../../services/ApiServices";

// Update Doctor API
export const updateDoctorApi = async (doctorId, doctorData) => {
  // Prepare doctor data for API
  const apiDoctorData = {
    operation: "update",
    doctor_id: doctorId,
    ...doctorData,
  };

  const response = await apiServices.post(
    '/doctors_operation',
    apiDoctorData
  );
  console.log("Doctor updated successfully:", response);
  return response;
};
