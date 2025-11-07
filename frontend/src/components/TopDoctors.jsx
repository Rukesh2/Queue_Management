import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div id='doctors' className='section-padding bg-white'>
            <div className='container-custom'>
                {/* Section Header */}
                <div className='text-center max-w-2xl mx-auto mb-12'>
                    <span className='inline-block bg-accent/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4'>
                        Meet Our Experts
                    </span>
                    <h2 className='text-4xl md:text-5xl font-bold text-dark mb-4'>
                        Top Rated Doctors
                    </h2>
                    <p className='text-gray-custom text-lg'>
                        Book appointments with our highly qualified and experienced medical professionals.
                    </p>
                </div>

                {/* Doctors Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
                    {doctors.slice(0, 10).map((item, index) => (
                        <div 
                            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                            className='group cursor-pointer'
                            key={index}
                        >
                            <div className='card card-hover overflow-hidden'>
                                {/* Doctor Image */}
                                <div className='relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5'>
                                    <img 
                                        className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500' 
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
                                            Book Now
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
                                    
                                    {/* Stats or Rating */}
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

                {/* View All Button */}
                <div className='text-center mt-12'>
                    <button 
                        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                        className='btn-secondary group'
                    >
                        View All Doctors
                        <span className='inline-block group-hover:translate-x-1 transition-transform duration-300'>→</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopDoctors