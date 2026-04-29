import { useState } from 'react';
import { useDoctors } from '../hooks/useDoctors';
import DoctorCard from '../components/DoctorCard';

const DoctorListPage = () => {

  const { doctors, loading, error } = useDoctors();

  const [search, setSearch] = useState('');
  const [filterSpec, setFilterSpec] = useState('');

  const filteredDoctors = doctors.filter(doc => {
    const fullName = `${doc.firstName} ${doc.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase());
    const matchesSpec = filterSpec
      ? doc.specialization === filterSpec
      : true;
    return matchesSearch && matchesSpec;
  });

  const specializations = [...new Set(doctors.map(d => d.specialization))];

  const handleBookClick = (doctor) => {
    console.log('Book clicked for:', doctor);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12
                        border-4 border-primary-500 border-t-transparent"/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-primary-600 text-white
                       rounded-xl hover:bg-primary-700">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
        <p className="text-gray-500 mt-1">
          {doctors.length} doctors available
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <select
          value={filterSpec}
          onChange={(e) => setFilterSpec(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option value="">All Specializations</option>
          {specializations.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-xl">No doctors found</p>
          <p className="text-sm mt-2">Try adjusting your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookClick={handleBookClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorListPage;