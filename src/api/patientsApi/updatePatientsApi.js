import apiServices from '../../services/ApiServices'

// Update Patient API
export const updatePatientApi = async (patientId, patientData) => {
    // Prepare patient data for API
    const apiPatientData = {
      operation: 'update',
      ...patientData
    }
    
    const response = await apiServices.put(`/patients_operation/${patientId}`, apiPatientData)
    console.log('Patient updated successfully:', response)
    return response
}
