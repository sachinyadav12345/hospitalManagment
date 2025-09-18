import apiServices from '../../services/ApiServices'

// Create Doctor API
export const createDoctorApi = async (doctorData) => {
    // Prepare doctor data for API
    const apiDoctorData = {
      operation: 'create',
      ...doctorData
    }
    const response = await apiServices.post('/doctors_operation', apiDoctorData)
    console.log('Doctor created successfully:', response)
    return response
}