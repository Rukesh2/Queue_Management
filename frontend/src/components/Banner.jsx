import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='section-padding bg-gradient-to-b from-light to-white'>
            <div className='container-custom'>
                <div className='relative overflow-hidden rounded-card shadow-card-hover'>
                    {/* Background Pattern */}
                    <div className='absolute inset-0 gradient-bg'></div>
                    <div className='absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl'></div>
                    <div className='absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl'></div>
                    
                    <div className='relative flex flex-col md:flex-row items-center'>
                        {/* Left Side - Content */}
                        <div className='flex-1 p-8 sm:p-12 md:p-16 lg:p-20 z-10'>
                            {/* Badge */}
                            <div className='inline-block mb-6'>
                                <span className='bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium border border-white/30'>
                                    🎉 Limited Time Offer
                                </span>
                            </div>

                            {/* Heading */}
                            <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6'>
                                Ready to Get Started?
                                <span className='block mt-2'>Join 100+ Trusted Doctors</span>
                            </h2>

                            {/* Description */}
                            <p className='text-white/90 text-lg mb-8 max-w-lg leading-relaxed'>
                                Create your account today and experience hassle-free healthcare. Get instant access to our network of verified medical professionals.
                            </p>

                            {/* Features List */}
                            <div className='space-y-3 mb-8'>
                                <div className='flex items-center gap-3 text-white'>
                                    <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0'>
                                        <span className='text-sm'>✓</span>
                                    </div>
                                    <span className='text-sm md:text-base'>Instant appointment booking</span>
                                </div>
                                <div className='flex items-center gap-3 text-white'>
                                    <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0'>
                                        <span className='text-sm'>✓</span>
                                    </div>
                                    <span className='text-sm md:text-base'>24/7 customer support</span>
                                </div>
                                <div className='flex items-center gap-3 text-white'>
                                    <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0'>
                                        <span className='text-sm'>✓</span>
                                    </div>
                                    <span className='text-sm md:text-base'>Secure & confidential</span>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className='flex flex-wrap gap-4'>
                                <button 
                                    onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                                    className='bg-white text-primary px-8 py-4 rounded-button font-bold shadow-button hover:shadow-card-hover hover:scale-105 transition-all duration-300 group'
                                >
                                    <span className='flex items-center gap-2'>
                                        Create Free Account
                                        <span className='group-hover:translate-x-1 transition-transform duration-300'>→</span>
                                    </span>
                                </button>
                                <button 
                                    onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                                    className='bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-button font-bold border-2 border-white/30 hover:bg-white/20 transition-all duration-300'
                                >
                                    Browse Doctors
                                </button>
                            </div>

                            {/* Trust Badge */}
                            <div className='flex items-center gap-4 mt-8 pt-8 border-t border-white/20'>
                                <div className='flex -space-x-2'>
                                    <div className='w-10 h-10 rounded-full bg-white/30 border-2 border-white'></div>
                                    <div className='w-10 h-10 rounded-full bg-white/30 border-2 border-white'></div>
                                    <div className='w-10 h-10 rounded-full bg-white/30 border-2 border-white'></div>
                                </div>
                                <div className='text-white'>
                                    <p className='font-bold text-lg'>5,000+</p>
                                    <p className='text-sm text-white/80'>Happy patients</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className='md:w-1/2 lg:w-[45%] relative p-8 md:p-0'>
                            <div className='relative z-10'>
                                {/* Decorative elements */}
                                <div className='absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full opacity-20 blur-2xl animate-pulse-slow'></div>
                                <div className='absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-full opacity-10 blur-2xl animate-pulse-slow'></div>
                                
                                {/* Image Container */}
                                <div className='relative'>
                                    <img 
                                        className='w-full max-w-md mx-auto md:max-w-none relative z-10 drop-shadow-2xl transform hover:scale-105 transition-transform duration-500' 
                                        src={assets.appointment_img} 
                                        alt="Appointment" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner