import { useState, useEffect } from 'react';
import { getAllDoctors } from '../api/doctors';

export const useDoctors = () => {

  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await getAllDoctors();
        setDoctors(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return { doctors, loading, error };
};