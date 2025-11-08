import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='section-padding bg-light'>
      <div className='container-custom'>
        
        {/* Page Header */}
        <div className='text-center mb-12'>
          <span className='inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4'>
            Get In Touch
          </span>
          <h1 className='text-4xl md:text-5xl font-bold text-dark mb-4'>
            Contact <span className='text-primary'>Us</span>
          </h1>
          <p className='text-gray-custom text-lg max-w-2xl mx-auto'>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
          
          {/* Contact Image & Info */}
          <div>
            <div className='card overflow-hidden mb-8'>
              <img 
                className='w-full h-80 object-cover' 
                src={assets.contact_image} 
                alt='Contact Us' 
              />
            </div>

            {/* Contact Cards */}
            <div className='space-y-6'>
              
              {/* Office Info */}
              <div className='card p-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-primary/10 rounded-button flex items-center justify-center flex-shrink-0'>
                    <span className='text-2xl'>🏢</span>
                  </div>
                  <div>
                    <h3 className='text-lg font-bold text-dark mb-2'>Our Office</h3>
                    <p className='text-gray-custom mb-2'>
                      54709 Willms Station<br />
                      Suite 350, Hyderabad, India
                    </p>
                    <p className='text-sm text-primary font-semibold'>Visit us Monday - Friday, 9AM - 6PM</p>
                  </div>
                </div>
              </div>

              {/* Phone & Email */}
              <div className='card p-6'>
                <div className='flex items-start gap-4 mb-6'>
                  <div className='w-12 h-12 bg-primary/10 rounded-button flex items-center justify-center flex-shrink-0'>
                    <span className='text-2xl'>📞</span>
                  </div>
                  <div>
                    <h3 className='text-lg font-bold text-dark mb-2'>Phone</h3>
                    <p className='text-gray-custom mb-1'>(415) 555-0132</p>
                    <p className='text-sm text-primary font-semibold'>Mon-Fri 9AM - 6PM</p>
                  </div>
                </div>
                
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-primary/10 rounded-button flex items-center justify-center flex-shrink-0'>
                    <span className='text-2xl'>✉️</span>
                  </div>
                  <div>
                    <h3 className='text-lg font-bold text-dark mb-2'>Email</h3>
                    <p className='text-gray-custom mb-1'>prescripto@gmail.com</p>
                    <p className='text-sm text-primary font-semibold'>24/7 Support</p>
                  </div>
                </div>
              </div>

              {/* Careers Card */}
              <div className='card p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-l-4 border-primary'>
                <h3 className='text-xl font-bold text-dark mb-3'>Careers at MediQueue</h3>
                <p className='text-gray-custom mb-4 leading-relaxed'>
                  Join our team of innovators! We're always looking for talented individuals who are passionate about transforming healthcare.
                </p>
                <button className='btn-secondary'>
                  Explore Opportunities
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='card p-8'>
            <h2 className='text-2xl font-bold text-dark mb-2'>Send Us a Message</h2>
            <p className='text-gray-custom mb-6'>Fill out the form below and we'll get back to you within 24 hours</p>
            
            <form className='space-y-5'>
              {/* Name */}
              <div>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Full Name
                </label>
                <input 
                  type='text' 
                  placeholder='Enter your full name'
                  className='input-field'
                />
              </div>

              {/* Email */}
              <div>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Email Address
                </label>
                <input 
                  type='email' 
                  placeholder='Enter your email'
                  className='input-field'
                />
              </div>

              {/* Phone */}
              <div>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Phone Number
                </label>
                <input 
                  type='tel' 
                  placeholder='Enter your phone number'
                  className='input-field'
                />
              </div>

              {/* Subject */}
              <div>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Subject
                </label>
                <input 
                  type='text' 
                  placeholder='What is this regarding?'
                  className='input-field'
                />
              </div>

              {/* Message */}
              <div>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Message
                </label>
                <textarea 
                  rows='5'
                  placeholder='Tell us more about your inquiry...'
                  className='input-field resize-none'
                ></textarea>
              </div>

              {/* Submit Button */}
              <button type='submit' className='btn-primary w-full'>
                Send Message
              </button>
            </form>

            {/* Contact Info at bottom */}
            <div className='mt-8 pt-8 border-t border-gray-200'>
              <p className='text-sm text-gray-custom text-center'>
                Need immediate assistance? Call us at <span className='font-semibold text-primary'>(415) 555-0132</span>
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='card p-8 md:p-12'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-dark mb-3'>Frequently Asked Questions</h2>
            <p className='text-gray-custom'>Quick answers to common questions</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-light rounded-button p-6'>
              <h4 className='font-bold text-dark mb-2'>What are your operating hours?</h4>
              <p className='text-sm text-gray-custom'>We're available Monday to Friday, 9AM - 6PM. Emergency support available 24/7.</p>
            </div>
            <div className='bg-light rounded-button p-6'>
              <h4 className='font-bold text-dark mb-2'>How quickly will I get a response?</h4>
              <p className='text-sm text-gray-custom'>We typically respond to all inquiries within 24 hours on business days.</p>
            </div>
            <div className='bg-light rounded-button p-6'>
              <h4 className='font-bold text-dark mb-2'>Do you offer technical support?</h4>
              <p className='text-sm text-gray-custom'>Yes! Our technical team is available to help you with any platform-related issues.</p>
            </div>
            <div className='bg-light rounded-button p-6'>
              <h4 className='font-bold text-dark mb-2'>Can I schedule an in-person meeting?</h4>
              <p className='text-sm text-gray-custom'>Absolutely! Contact us to schedule a visit to our Hyderabad office.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact