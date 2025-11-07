import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='section-padding bg-gradient-to-b from-white to-light'>
            <div className='container-custom'>
                {/* Section Header */}
                <div className='text-center max-w-2xl mx-auto mb-12'>
                    <span className='inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4'>
                        Our Specialties
                    </span>
                    <h2 className='text-4xl md:text-5xl font-bold text-dark mb-4'>
                        Find Doctors by Speciality
                    </h2>
                    <p className='text-gray-custom text-lg'>
                        Browse through our diverse range of medical specialties and connect with expert healthcare professionals tailored to your needs.
                    </p>
                </div>

                {/* Speciality Cards Grid */}
                <div className='flex justify-center gap-6 flex-wrap'>
                    {specialityData.map((item, index) => (
                        <Link 
                            to={`/doctors/${item.speciality}`} 
                            onClick={() => scrollTo(0, 0)} 
                            className='group' 
                            key={index}
                        >
                            <div className='flex flex-col items-center gap-3 p-6 bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer w-40 card-hover'>
                                {/* Icon Container */}
                                <div className='w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                                    <img className='w-12 h-12 object-contain' src={item.image} alt={item.speciality} />
                                </div>
                                
                                {/* Speciality Name */}
                                <p className='text-center text-sm font-semibold text-dark group-hover:text-primary transition-colors duration-300'>
                                    {item.speciality}
                                </p>
                                
                                {/* Hover Indicator */}
                                <div className='w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300'></div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className='text-center mt-12'>
                    <p className='text-gray-custom mb-4'>Can't find what you're looking for?</p>
                    <Link to='/doctors' className='btn-outline'>
                        View All Doctors
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SpecialityMenu