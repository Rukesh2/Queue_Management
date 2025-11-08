import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-dark text-white mt-20'>
      <div className='container-custom py-12 md:py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
          
          {/* Company Info */}
          <div className='lg:col-span-2'>
            <img className='w-64 md:w-72 lg:w-80 brightness-0 invert' src={assets.logo} alt="MediQueue Logo" />
            <p className='text-white/70 leading-relaxed mb-6 max-w-md'>
              Book appointments with trusted doctors, pay securely online, and skip the long waiting lines. MediQueue keeps you informed about your exact queue position so you always arrive just on time. Simple, fast, and reliable – because your health shouldn't wait.
            </p>
            
            {/* Social Media Links */}
            <div className='flex gap-4'>
              <a href='#' className='w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300'>
                <span className='text-lg'>f</span>
              </a>
              <a href='#' className='w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300'>
                <span className='text-lg'>𝕏</span>
              </a>
              <a href='#' className='w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300'>
                <span className='text-lg'>in</span>
              </a>
              <a href='#' className='w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300'>
                <span className='text-lg'>📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-bold mb-5'>Quick Links</h3>
            <ul className='space-y-3'>
              <li>
                <Link to='/' className='text-white/70 hover:text-primary transition-colors duration-300'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/doctors' className='text-white/70 hover:text-primary transition-colors duration-300'>
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to='/about' className='text-white/70 hover:text-primary transition-colors duration-300'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to='/contact' className='text-white/70 hover:text-primary transition-colors duration-300'>
                  Contact
                </Link>
              </li>
              <li>
                <a href='#' className='text-white/70 hover:text-primary transition-colors duration-300'>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-bold mb-5'>Get In Touch</h3>
            <ul className='space-y-4'>
              <li className='flex items-start gap-3'>
                <span className='text-primary mt-1'>📞</span>
                <div>
                  <p className='text-white/70'>+91-8746187810</p>
                  <p className='text-xs text-white/50'>Mon-Fri 9am-6pm</p>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-primary mt-1'>✉️</span>
                <div>
                  <p className='text-white/70'>mediqueue@gmail.com</p>
                  <p className='text-xs text-white/50'>24/7 Support</p>
                </div>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-primary mt-1'>📍</span>
                <div>
                  <p className='text-white/70'>Hyderabad, India</p>
                  <p className='text-xs text-white/50'>Visit us today</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className='mt-12 pt-8 border-t border-white/10'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='text-center md:text-left'>
              <h4 className='text-lg font-bold mb-2'>Stay Updated</h4>
              <p className='text-white/70 text-sm'>Subscribe to get latest healthcare tips and updates</p>
            </div>
            <div className='flex gap-2 w-full md:w-auto'>
              <input 
                type='email' 
                placeholder='Enter your email' 
                className='px-4 py-3 rounded-button bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary w-full md:w-64'
              />
              <button className='btn-primary whitespace-nowrap'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='bg-dark/50 border-t border-white/10'>
        <div className='container-custom py-6'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60'>
            <p>© 2024 MediQueue. All rights reserved.</p>
            <div className='flex gap-6'>
              <a href='#' className='hover:text-primary transition-colors'>Terms of Service</a>
              <a href='#' className='hover:text-primary transition-colors'>Privacy Policy</a>
              <a href='#' className='hover:text-primary transition-colors'>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer