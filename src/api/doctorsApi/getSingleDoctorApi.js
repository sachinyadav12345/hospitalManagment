import apiServices from '../../services/ApiServices'

// Get Single Doctor API
export const getSingleDoctorApi = async (doctorId) => {     
  const response = await apiServices.post(
    '/doctors_operation',
    {
      doctor_id: doctorId,
      operation: "get",
    }
  );
  console.log('Doctor fetched successfully:', response)
  return response;
} 