import apiServices from '../../services/ApiServices'

    // Get Single Patient API
export const getSinglePatientApi = async (patientId) => {     
  let response = await apiServices.post(
    `patients_operation/${patientId}`,
    {
      patient_id: patientId,
      operation: "get",
    }
  );
  return response;
} 