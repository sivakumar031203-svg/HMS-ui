import apiClient from './axios';


export const getAllDoctors = async () => {
  const response = await apiClient.get('/doctors');
  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await apiClient.get(`/doctors/${id}`);
  return response.data;
};

export const getDoctorSlots = async (doctorId, date) => {
  const response = await apiClient.get(`/doctors/${doctorId}/slots`, {
    params: { date }
  });
  return response.data;
};