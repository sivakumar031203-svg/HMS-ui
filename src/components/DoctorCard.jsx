const DoctorCard = ({ doctor, onBookClick }) => {

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl
                    transition-shadow duration-300 p-6 flex flex-col gap-4">

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary-100
                        flex items-center justify-center
                        text-primary-700 font-bold text-lg">
          {doctor.firstName[0]}{doctor.lastName[0]}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Dr. {doctor.firstName} {doctor.lastName}
          </h3>
          <p className="text-sm text-primary-600 font-medium">
            {doctor.specialization}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="font-medium">Experience:</span>
          <span>{doctor.experienceYears} years</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Fee:</span>
          <span className="text-green-600 font-semibold">
            ₹{doctor.consultationFee}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium
            ${doctor.available
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
            }`}>
            {doctor.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>

      <button
        onClick={() => onBookClick(doctor)}

        disabled={!doctor.available}

        className="mt-auto w-full py-2 px-4 rounded-xl font-medium
                   text-white bg-primary-600 hover:bg-primary-700
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;