import apiServices from '../../services/ApiServices'

// Create Appointments API
export const createAppointmentApi = async (appointmentData) => {
    const apiAppointmentData = {
        operation: 'create',
        ...appointmentData,
    }
    const response = await apiServices.post('/booking_operation', apiAppointmentData)
    console.log('Appointments created successfully:', response)  
    return response
}