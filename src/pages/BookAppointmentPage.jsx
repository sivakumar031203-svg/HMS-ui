// src/pages/BookAppointmentPage.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDoctorSlots } from '../api/doctors';
import { bookAppointment } from '../api/appointments';

const BookAppointmentPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { doctor } = location.state || {};

    // ✅ Hooks ALWAYS at top
    const [selectedDate, setSelectedDate] = useState('');
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [symptoms, setSymptoms] = useState('');
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [booking, setBooking] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // ✅ Redirect handled safely
    useEffect(() => {
        if (!doctor) {
            navigate('/doctors');
        }
    }, [doctor, navigate]);

    // ✅ Prevent render crash while redirecting
    if (!doctor) {
        return null;
    }

    // ── Fetch slots when date changes ──
    const handleDateChange = async (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        setSelectedSlot(null);  // reset slot selection when date changes
        setError('');

        if (!date) return;

        try {
            setLoadingSlots(true);
            const data = await getDoctorSlots(doctor.id, date);
            setSlots(data);

            if (data.length === 0) {
                setError('No available slots for this date. Try another date.');
            }
        } catch (err) {
            setError('Failed to load slots. Please try again.', err);
        } finally {
            setLoadingSlots(false);
        }
    };

    // ── Book appointment ──
    const handleBooking = async () => {
        if (!selectedSlot) {
            setError('Please select a time slot');
            return;
        }

        try {
            setBooking(true);
            setError('');

            // Hardcoded patientId = 1 for now
            // Phase 6: this comes from JWT token / auth context
            await bookAppointment(1, selectedSlot.slotId, symptoms);

            setSuccess(true);
            // Triggers success screen render below

        } catch (err) {
            const message = err.response?.data?.message;
            // Our GlobalExceptionHandler always puts message here

            if (err.response?.status === 409) {
                setError('This slot was just booked by someone else. Please select another.');
                // Race condition — slot taken between user seeing it and booking it
                // Refresh slots to show current availability
                handleDateChange({ target: { value: selectedDate } });
            } else {
                setError(message || 'Booking failed. Please try again.');
            }
        } finally {
            setBooking(false);
        }
    };

    // ── Success Screen ──
    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">

                    {/* Animated checkmark */}
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center
                          justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Appointment Booked!
                    </h2>
                    <p className="text-gray-500 mb-2">
                        Dr. {doctor.firstName} {doctor.lastName}
                    </p>
                    <p className="text-gray-500 mb-6">
                        {selectedDate} at {selectedSlot?.startTime}
                    </p>

                    <button
                        onClick={() => navigate('/doctors')}
                        className="w-full py-3 bg-primary-600 text-white rounded-xl
                       font-medium hover:bg-primary-700 transition-colors">
                        Back to Doctors
                    </button>
                </div>
            </div>
        );
    }

    // ── Main Booking Form ──
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">

                {/* Back button */}
                <button
                    onClick={() => navigate('/doctors')}
                    className="flex items-center gap-2 text-gray-600
                     hover:text-gray-900 mb-6 transition-colors">
                    ← Back to Doctors
                </button>

                {/* Doctor Summary Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        Dr. {doctor.firstName} {doctor.lastName}
                    </h2>
                    <p className="text-primary-600">{doctor.specialization}</p>
                    <p className="text-gray-500 text-sm mt-1">
                        {doctor.experienceYears} years experience •
                        ₹{doctor.consultationFee} consultation fee
                    </p>
                </div>

                {/* Booking Form */}
                <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Select Date & Time
                    </h3>

                    {/* Date Picker */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Appointment Date
                        </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            min={new Date().toISOString().split('T')[0]}
                            // min = today's date in YYYY-MM-DD format
                            // Prevents selecting past dates in the date picker UI
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    {/* Slot Grid */}
                    {loadingSlots ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-4
                              border-primary-500 border-t-transparent"/>
                        </div>
                    ) : slots.length > 0 ? (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Available Slots
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {slots.map(slot => (
                                    <button
                                        key={slot.slotId}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`py-2 px-3 rounded-xl text-sm font-medium
                                border-2 transition-all duration-200
                      ${selectedSlot?.slotId === slot.slotId
                                                ? 'border-primary-600 bg-primary-50 text-primary-700'
                                                : 'border-gray-200 text-gray-700 hover:border-primary-300'
                                            }`}>
                                        {slot.startTime}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : selectedDate ? (
                        <p className="text-center text-gray-400 py-4">
                            No slots available for this date
                        </p>
                    ) : null}

                    {/* Symptoms Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Symptoms <span className="text-gray-400">(optional)</span>
                        </label>
                        <textarea
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            placeholder="Describe your symptoms briefly..."
                            rows={3}
                            maxLength={1000}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-primary-500
                         resize-none"
                        />
                        <p className="text-xs text-gray-400 text-right mt-1">
                            {symptoms.length}/1000
                        </p>
                        {/* Character counter — matches backend @Size(max=1000) */}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl
                            px-4 py-3 text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Book Button */}
                    <button
                        onClick={handleBooking}
                        disabled={!selectedSlot || booking}
                        className="w-full py-3 bg-primary-600 text-white rounded-xl
                       font-semibold hover:bg-primary-700
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200">
                        {booking ? 'Booking...' : 'Confirm Appointment'}
                        {/* Text changes during loading — clear user feedback */}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BookAppointmentPage;