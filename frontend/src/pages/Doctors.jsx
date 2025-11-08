import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  return (
    <div className='section-padding bg-light'>
      <div className='container-custom'>
        
        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-dark mb-2'>Find Your Doctor</h1>
          <p className='text-gray-custom text-lg'>Browse through our specialists and book your appointment today.</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          
          {/* Sidebar Filter */}
          <div className='lg:w-64 flex-shrink-0'>
            {/* Mobile Filter Toggle */}
            <button 
              onClick={() => setShowFilter(!showFilter)} 
              className={`lg:hidden w-full btn-outline mb-4 ${showFilter ? '!bg-primary !text-white' : ''}`}
            >
              {showFilter ? '✕ Close Filters' : '⚙ Show Filters'}
            </button>

            {/* Filter Panel */}
            <div className={`${showFilter ? 'block' : 'hidden lg:block'}`}>
              <div className='bg-white rounded-card shadow-card p-6'>
                <h3 className='text-lg font-bold text-dark mb-4'>Filter by Speciality</h3>
                
                {/* Clear Filter Button */}
                {speciality && (
                  <button 
                    onClick={() => navigate('/doctors')}
                    className='w-full mb-4 px-4 py-2 text-sm bg-secondary/10 text-secondary rounded-button hover:bg-secondary/20 transition-colors'
                  >
                    ✕ Clear Filter
                  </button>
                )}

                {/* Speciality List */}
                <div className='flex flex-col gap-2'>
                  {specialities.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)}
                      className={`text-left px-4 py-3 rounded-button border-2 transition-all font-medium ${
                        speciality === item 
                          ? 'bg-primary text-white border-primary shadow-button' 
                          : 'bg-white text-dark border-gray-200 hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Results Count */}
                <div className='mt-6 pt-6 border-t border-gray-200'>
                  <p className='text-sm text-gray-custom'>
                    Showing <span className='font-bold text-primary'>{filterDoc.length}</span> doctors
                    {speciality && <span> in <span className='font-semibold'>{speciality}</span></span>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className='flex-1'>
            {filterDoc.length === 0 ? (
              <div className='text-center py-20'>
                <div className='w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <span className='text-3xl'>🔍</span>
                </div>
                <h3 className='text-xl font-semibold text-dark mb-2'>No Doctors Found</h3>
                <p className='text-gray-custom mb-6'>Try adjusting your filters or browse all doctors</p>
                {speciality && (
                  <button onClick={() => navigate('/doctors')} className='btn-primary'>
                    View All Doctors
                  </button>
                )}
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filterDoc.map((item, index) => (
                  <div 
                    key={index}
                    onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                    className='group cursor-pointer'
                  >
                    <div className='card card-hover overflow-hidden'>
                      {/* Doctor Image */}
                      <div className='relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5'>
                        <img 
                          className='w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500' 
                          src={item.image} 
                          alt={item.name} 
                        />
                        
                        {/* Availability Badge */}
                        <div className='absolute top-4 right-4'>
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm ${
                            item.available 
                              ? 'bg-success/90 text-white' 
                              : 'bg-gray-400/90 text-white'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              item.available ? 'bg-white animate-pulse' : 'bg-white/70'
                            }`}></div>
                            <span className='text-xs font-semibold'>
                              {item.available ? 'Available' : 'Busy'}
                            </span>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className='absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6'>
                          <button className='bg-white text-primary px-6 py-2 rounded-button font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                            Book Appointment
                          </button>
                        </div>
                      </div>

                      {/* Doctor Info */}
                      <div className='p-5'>
                        <h3 className='text-lg font-bold text-dark mb-1 group-hover:text-primary transition-colors duration-300'>
                          {item.name}
                        </h3>
                        <p className='text-gray-custom text-sm mb-3'>
                          {item.speciality}
                        </p>
                        
                        {/* Stats */}
                        <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                          <div className='flex items-center gap-1'>
                            <span className='text-warning text-lg'>★</span>
                            <span className='text-sm font-semibold text-dark'>4.8</span>
                            <span className='text-xs text-gray-custom'>(120)</span>
                          </div>
                          <div className='text-xs text-gray-custom'>
                            500+ Patients
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors