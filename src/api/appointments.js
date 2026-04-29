import apiClient from './axios';

export const bookAppointment = async (patientId, slotId, symptoms) => {
  const response = await apiClient.post(
    `/appointments?patientId=${patientId}`,
    { slotId, symptoms }
  );
  return response.data;
};