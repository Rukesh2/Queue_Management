import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='section-padding bg-light'>
      <div className='container-custom'>
        
        {/* Page Header */}
        <div className='text-center mb-12'>
          <span className='inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4'>
            Our Story
          </span>
          <h1 className='text-4xl md:text-5xl font-bold text-dark mb-4'>
            About <span className='text-primary'>MediQueue</span>
          </h1>
          <p className='text-gray-custom text-lg max-w-2xl mx-auto'>
            Revolutionizing healthcare access with smart queue management
          </p>
        </div>

        {/* Main Content */}
        <div className='card p-8 md:p-12 mb-12'>
          <div className='flex flex-col lg:flex-row gap-12 items-center'>
            <div className='lg:w-1/2'>
              <div className='relative'>
                <img 
                  className='w-full rounded-card shadow-card-hover' 
                  src={assets.about_image} 
                  alt='About Us' 
                />
                <div className='absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-card'></div>
              </div>
            </div>
            
            <div className='lg:w-1/2 space-y-6'>
              <div>
                <h3 className='text-2xl font-bold text-dark mb-4'>Welcome to MediQueue</h3>
                <p className='text-gray-custom leading-relaxed'>
                  Welcome to MediQueue, your trusted partner in managing your healthcare needs conveniently and efficiently. At MediQueue, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
                </p>
              </div>
              
              <div>
                <p className='text-gray-custom leading-relaxed'>
                  MediQueue is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, MediQueue is here to support you every step of the way.
                </p>
              </div>

              <div className='bg-gradient-to-r from-primary/5 to-accent/5 rounded-button p-6 border-l-4 border-primary'>
                <h4 className='text-xl font-bold text-dark mb-3'>Our Vision</h4>
                <p className='text-gray-custom leading-relaxed'>
                  Our vision at MediQueue is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                </p>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-3 gap-4 pt-6'>
                <div className='text-center'>
                  <p className='text-3xl font-bold text-primary mb-1'>100+</p>
                  <p className='text-sm text-gray-custom'>Doctors</p>
                </div>
                <div className='text-center'>
                  <p className='text-3xl font-bold text-primary mb-1'>5000+</p>
                  <p className='text-sm text-gray-custom'>Patients</p>
                </div>
                <div className='text-center'>
                  <p className='text-3xl font-bold text-primary mb-1'>24/7</p>
                  <p className='text-sm text-gray-custom'>Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-dark mb-4'>
            Why Choose <span className='text-primary'>Us</span>
          </h2>
          <p className='text-gray-custom text-lg max-w-2xl mx-auto'>
            We're dedicated to providing the best healthcare experience
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Feature 1 */}
          <div className='group'>
            <div className='card p-8 h-full hover:bg-gradient-to-br hover:from-primary hover:to-accent transition-all duration-500 text-center'>
              <div className='w-16 h-16 bg-primary/10 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500'>
                <span className='text-3xl group-hover:scale-110 transition-transform duration-500'>⚡</span>
              </div>
              <h3 className='text-xl font-bold text-dark group-hover:text-white mb-4 transition-colors duration-500'>
                Efficiency
              </h3>
              <p className='text-gray-custom group-hover:text-white/90 leading-relaxed transition-colors duration-500'>
                Streamlined appointment scheduling that fits into your busy lifestyle. Book appointments in seconds and skip the waiting lines.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className='group'>
            <div className='card p-8 h-full hover:bg-gradient-to-br hover:from-primary hover:to-accent transition-all duration-500 text-center'>
              <div className='w-16 h-16 bg-primary/10 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500'>
                <span className='text-3xl group-hover:scale-110 transition-transform duration-500'>🏥</span>
              </div>
              <h3 className='text-xl font-bold text-dark group-hover:text-white mb-4 transition-colors duration-500'>
                Convenience
              </h3>
              <p className='text-gray-custom group-hover:text-white/90 leading-relaxed transition-colors duration-500'>
                Access to a network of trusted healthcare professionals in your area. Find the right doctor for your needs instantly.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className='group'>
            <div className='card p-8 h-full hover:bg-gradient-to-br hover:from-primary hover:to-accent transition-all duration-500 text-center'>
              <div className='w-16 h-16 bg-primary/10 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500'>
                <span className='text-3xl group-hover:scale-110 transition-transform duration-500'>🎯</span>
              </div>
              <h3 className='text-xl font-bold text-dark group-hover:text-white mb-4 transition-colors duration-500'>
                Personalization
              </h3>
              <p className='text-gray-custom group-hover:text-white/90 leading-relaxed transition-colors duration-500'>
                Tailored recommendations and reminders to help you stay on top of your health. Your wellness, your way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About