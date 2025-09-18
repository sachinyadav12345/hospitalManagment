import apiServices from '../../services/ApiServices'

export const getAllPatientsApi = async () => {
  const response = await apiServices.post(
    '/patients_operation',
    {
      operation: "get_all",
    }
  );
  console.log('Patients fetched successfully:', response)
  return response;
} 
