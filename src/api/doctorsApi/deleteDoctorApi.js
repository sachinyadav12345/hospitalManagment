import apiServices from '../../services/ApiServices'

export const deleteDoctorApi = async (id) => {
    const response = await apiServices.post('/doctors_operation', {
        operation: "delete", 
        doctor_id: id,
    });
    console.log('Doctor deleted successfully:', response)
    return response;
};
