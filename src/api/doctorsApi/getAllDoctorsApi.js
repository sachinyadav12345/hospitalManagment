import apiServices from '../../services/ApiServices'

// Get All Doctors API
export const getAllDoctorsApi = async () => {    
    const response = await apiServices.post('/doctors_operation', {
      operation: 'get_all',
    })    
    console.log('Doctors fetched successfully:', response)
    return response
  } 

  



