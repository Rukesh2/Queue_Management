import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return relDoc.length > 0 ? (
        <div className='py-16'>
            <div className='text-center mb-12'>
                <span className='inline-block bg-accent/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4'>
                    More Options
                </span>
                <h2 className='text-3xl md:text-4xl font-bold text-dark mb-3'>
                    Related Doctors in {speciality}
                </h2>
                <p className='text-gray-custom text-lg max-w-2xl mx-auto'>
                    Explore more qualified specialists in this field
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {relDoc.slice(0, 4).map((item, index) => (
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
                                        View Profile
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
        </div>
    ) : null
}

export default RelatedDoctors