import apiServices from '../../services/ApiServices'

// Create Patient API
export const createPatientApi = async (patientData) => {
    // Prepare patient data for API
    const apiPatientData = {
      operation: 'create',
     ...patientData,
    }
    const response = await apiServices.post('/patients_operation', apiPatientData)
    console.log('Patient created successfully:', response)
    return response
}
