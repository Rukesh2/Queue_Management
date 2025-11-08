import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='relative overflow-hidden'>
            {/* Background Gradient */}
            <div className='absolute inset-0 gradient-bg opacity-95'></div>
            
            {/* Decorative Elements */}
            <div className='absolute top-10 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl'></div>
            <div className='absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl'></div>

            <div className='relative container-custom flex flex-col md:flex-row items-center gap-10 py-12 md:py-16 lg:py-20'>

                {/* Header Left */}
                <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 text-white z-10'>
                    <div className='inline-block'>
                        <span className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30'>
                            🏥 Healthcare Made Simple
                        </span>
                    </div>
                    
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                        Book Appointments
                        <span className='block mt-2'>With Trusted Doctors</span>
                    </h1>
                    
                    <p className='text-lg md:text-xl text-white/90 leading-relaxed max-w-lg'>
                        Connect with experienced healthcare professionals. Schedule your consultation in just a few clicks.
                    </p>

                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2'>
                        <div className='flex items-center gap-3'>
                            <img className='w-24 md:w-28 drop-shadow-lg' src={assets.group_profiles} alt="Doctors" />
                            <div>
                                <p className='text-2xl font-bold'>50+</p>
                                <p className='text-sm text-white/80'>Expert Doctors</p>
                            </div>
                        </div>
                        <div className='h-12 w-px bg-white/30 hidden sm:block'></div>
                        <div>
                            <p className='text-2xl font-bold'>1000+</p>
                            <p className='text-sm text-white/80'>Happy Patients</p>
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-4 mt-4'>
                        <a href='#speciality' className='flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-button font-semibold shadow-button hover:shadow-card-hover hover:scale-105 transition-all duration-300 group'>
                            Book Appointment
                            <img className='w-4 group-hover:translate-x-1 transition-transform duration-300' src={assets.arrow_icon} alt="Arrow" />
                        </a>
                        <a href='#doctors' className='flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-button font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-300'>
                            View Doctors
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className='flex flex-wrap gap-6 mt-6 pt-6 border-t border-white/20'>
                        <div className='flex items-center gap-2'>
                            <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
                                <span className='text-xl'>✓</span>
                            </div>
                            <span className='text-sm'>Verified Doctors</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
                                <span className='text-xl'>🔒</span>
                            </div>
                            <span className='text-sm'>Secure Platform</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center'>
                                <span className='text-xl'>⚡</span>
                            </div>
                            <span className='text-sm'>Instant Booking</span>
                        </div>
                    </div>
                </div>

                {/* Header Right */}
                <div className='md:w-1/2 relative z-10'>
                    <div className='relative'>
                        {/* Decorative Ring */}
                        <div className='absolute -inset-4 bg-white/10 rounded-card blur-xl'></div>
                        
                        {/* Main Image */}
                        <div className='relative rounded-card overflow-hidden shadow-card-hover'>
                            <img 
                                className='w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500' 
                                src={assets.header_img} 
                                alt="Doctors" 
                            />
                            
                            {/* Floating Stats Card */}
                            <div className='absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-button p-4 shadow-card animate-fade-in-up'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-sm text-gray-custom'>Available Now</p>
                                        <p className='text-lg font-bold text-primary'>24/7 Support</p>
                                    </div>
                                    <div className='w-12 h-12 bg-success/10 rounded-full flex items-center justify-center'>
                                        <div className='w-3 h-3 bg-success rounded-full animate-pulse-slow'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header