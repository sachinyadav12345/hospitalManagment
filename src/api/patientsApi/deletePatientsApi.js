import apiServices from '../../services/ApiServices'

export const deletePatientApi = async (id) => {
    const response = await apiServices.delete(`patients_operation`, {
        params: {
            operation: "delete", 
            patient_id: id,
        }
    });
    return response;
};
